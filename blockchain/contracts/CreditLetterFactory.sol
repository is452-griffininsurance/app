pragma solidity ^0.5.16;

import "./CreditLetter.sol";

contract CreditLetterFactory {
    event CreateLog(address addr, uint256 timestamp);
    function create(
        address issuer,
        address holder,
        address acceptor,
        uint256 issuanceTime,
        uint256 interestRate,
        uint256 credit
    ) public { 
        CreditLetter creditLetter = new CreditLetter(issuer, holder, acceptor, issuanceTime, interestRate, credit);
    }

    function split(address originalAddress, uint256 amount, uint256 timestamp) public {
        CreditLetter originalLetter = CreditLetter(originalAddress);
        (address issuer, address holder, address acceptor, , uint256 interestRate, uint256 credit, , ) = originalLetter.getInfo();
        originalLetter.resetCreditAmount(credit - amount, timestamp);
        CreditLetter creditLetter = new CreditLetter(issuer, holder, acceptor, timestamp, interestRate, amount);
    }
}