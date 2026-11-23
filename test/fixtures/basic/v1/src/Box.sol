// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Box {
    struct Item {
        uint128 amount;
        address owner;
    }

    bool private _initializing;
    address public admin;
    uint256 public value;
    mapping(uint256 => Item) public items;
    uint256[47] private __gap;

    event ValueChanged(uint256 indexed value);
    event AdminChanged(address admin);

    function initialize(address admin_) external {
        admin = admin_;
    }

    function setValue(uint256 v) external {
        value = v;
        emit ValueChanged(v);
    }

    function clear() external {
        value = 0;
    }

    function getValue() external view returns (uint256) {
        return value;
    }
}

/// Not upgradeable: ignored in the default scope.
contract Plain {
    uint256 public a;

    function set(uint256 a_) external {
        a = a_;
    }
}
