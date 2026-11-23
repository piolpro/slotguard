// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @notice A minimal share-based vault deployed behind a UUPS proxy.
contract Vault is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    using SafeERC20 for IERC20;

    struct Position {
        uint128 shares;
        uint64 depositedAt;
    }

    IERC20 public asset;
    uint256 public totalShares;
    mapping(address => Position) public positions;
    bool public paused;

    uint256[46] private __gap;

    event Deposited(address indexed account, uint256 assets, uint256 shares);
    event Withdrawn(address indexed account, uint256 assets, uint256 shares);

    error Paused();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(IERC20 asset_, address owner_) external initializer {
        __Ownable_init(owner_);
        asset = asset_;
    }

    function deposit(uint256 assets) external returns (uint256 shares) {
        if (paused) revert Paused();
        shares = convertToShares(assets);
        asset.safeTransferFrom(msg.sender, address(this), assets);
        positions[msg.sender].shares += uint128(shares);
        positions[msg.sender].depositedAt = uint64(block.timestamp);
        totalShares += shares;
        emit Deposited(msg.sender, assets, shares);
    }

    function withdraw(uint256 shares) external returns (uint256 assets) {
        assets = convertToAssets(shares);
        positions[msg.sender].shares -= uint128(shares);
        totalShares -= shares;
        asset.safeTransfer(msg.sender, assets);
        emit Withdrawn(msg.sender, assets, shares);
    }

    function setPaused(bool paused_) external onlyOwner {
        paused = paused_;
    }

    function totalAssets() public view returns (uint256) {
        return asset.balanceOf(address(this));
    }

    function convertToShares(uint256 assets) public view returns (uint256) {
        uint256 supply = totalShares;
        return supply == 0 ? assets : (assets * supply) / totalAssets();
    }

    function convertToAssets(uint256 shares) public view returns (uint256) {
        uint256 supply = totalShares;
        return supply == 0 ? shares : (shares * totalAssets()) / supply;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
