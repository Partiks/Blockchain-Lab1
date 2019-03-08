pragma solidity >=0.4.0 <0.6.0;
//more useful references
//https://solidity.readthedocs.io/en/v0.5.3/introduction-to-smart-contracts.html
//https://medium.com/coinmonks/ethereum-land-marketplace-dapp-tutorial-part-1-create-and-deploy-a-smart-contract-351bc0d62be2
//https://cse.buffalo.edu/~bina/cse426/spring2019/Lectures/Ballot.sol
//https://solidity.readthedocs.io/en/v0.5.4/solidity-by-example.html#safe-remote-purchase

contract MarketPlace {
    struct User{
        string username;
        uint balance;
        bool registered;
    }
    
    address chairperson;
    mapping (address => User) public users;
    
    constructor(uint bal) public {
        chairperson = msg.sender;
        users[chairperson].username = "ChairPerson";
        users[chairperson].balance=bal;
        users[chairperson].registered = true;
    }
    
     modifier onlyChair() 
     {require(msg.sender == chairperson);
     _;
     }
     
     modifier onlyRegistered(){
         require(users[msg.sender].registered == true);
         _;
     }
     
     modifier onlyRegisteredUsers(address seller){
         require(users[msg.sender].registered == true && users[seller].registered == true);
         _;
     }
    
    function buy(address seller, string memory item_id, string memory item_name, uint item_price) public onlyRegisteredUsers(seller){
        if(users[msg.sender].balance >= item_price && !compareStrings(users[msg.sender].username, users[seller].username) ){
            users[msg.sender].balance -= item_price;
            users[seller].balance+=item_price;
            
        }
        else{
            revert();
        }
    }
    
    function getUserBalance() public view onlyRegistered returns (uint balance){
        return users[msg.sender].balance;
    }
    
    function getUserDetails(address toUser) public view onlyChair returns (string memory uname, uint balance){
        return (users[toUser].username, users[toUser].balance);
    }
    
    function registerUser(address toUser, string memory uname, uint bal ) public onlyChair{
        
        users[toUser].username = uname;
        users[toUser].balance = bal;
        users[toUser].registered = true;
        
    }
    
    function unRegisterUser(address toUser ) public onlyChair{
        if(msg.sender != chairperson) revert();
        users[toUser].balance = 0;
        users[toUser].registered = false;
        
    }
    
    function depositMoney(uint amount) public onlyRegistered{
        if(amount <= 0) revert();
        users[msg.sender].balance+=amount;
    }
    
    function compareStrings (string memory a, string memory b) public view returns (bool) {
       return ( keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)) );
   }
    
}