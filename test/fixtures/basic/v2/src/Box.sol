// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Box {
    struct Item {
        uint128 amount;
        address owner;
        uint64 createdAt;
    }

    bool private _initializing;
    address public admin;
    uint128 public value;
    mapping(uint256 => Item) public items;
    uint256 public fee;
    uint256[46] private __gap;

    event ValueChanged(uint256 value);

    function initialize(address admin_) external {
        admin = admin_;
    }

    function setValue(uint128 v) external {
        value = v;
        emit ValueChanged(v);
    }

    function getValue() external view returns (uint128) {
        return value;
    }
}

contract Plain {
    uint256 public b;
    uint256 public a;

    function set(uint256 a_) external {
        a = a_;
    }
}
