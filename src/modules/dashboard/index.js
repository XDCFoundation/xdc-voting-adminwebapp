import React from "react";
import BaseComponent from "../baseComponent";
import Web3 from "web3";
import DashboardComponent from "./dashboardComponent";
import Utils from "../../utility";
import { AddService } from "../../services";
import Header from "./header"

let proposalContractAbi =
  require("../../common/abis/proposalContractAbi.json").abi;
let masterContractAbi = require("../../common/abis/masterContractAbi.json").abi;

export default class Dashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      addDialog: false,
      addConfirmDialog: false,
      deleteDialog: false,
      deleteConfirmDialog: false,
      editDialog: false,
      editConfirmDialog: false,
      setDialogOpen:false,
      setDialogOpen1:false,
      setAddDialogOpen:false,
      
    
     
    };
  }

  async componentDidMount() {
   
    
    
  }

  addWhiteListAddress = async (reqObj) => {
    
  this.setState({addDialog:true});
    let web3;
    web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    if (!accounts || !accounts.length) {
      Utils.apiFailureToast("Please login to Xinpay extension");
      return;
    }
    const acc = accounts[0];
    const contract = new web3.eth.Contract(
      masterContractAbi,
      process.env.REACT_APP_MASTER_CONTRACT_ADDRESS//"0xc96b57A8F1A98278007B559Dc8A8B343e3559F6a"  //0x85fe7c9734585a494b03c1a450ab0e9b79557cc4
    );
    return new Promise((resolve, reject) => {
      contract.methods
        .add_whitelist_address(
          reqObj.address,
          reqObj.permission.allowProposalCreation,
          reqObj.permission.allowVoting
        )
        .send({ from: acc }, async (err, transactionHash) => {
          
          if (err || !transactionHash) {
            reject(false);
            console.log("close xdcpay")
            this.setState({setAddDialogOpen:false})
            return;
          }
         
          const res = await this.getTransactionReceipt(transactionHash, reqObj);
          if (res) {
            
            let [error, addAddressRes] = await Utils.parseResponse(
              AddService.addWhitelistedAddress(reqObj)
            );
            console.log("error, addAddressRes",error, addAddressRes)
            if(error) {
              console.log("error.message ",error.message)
              reject(error.message)
            }
          }
          resolve(true);
        });
    });
  };


   setStateValues=(value)=>{
  this.setState({addDialog:value})
  }
  setConfirmDialogStateValues=(value)=>{
 this.setState({addConfirmDialog:value})
 }
  setDeleteDialogValue=(value)=>{
    this.setState({deleteDialog:value})
  }
  setDeleteConfirmDialogStateValues=(value)=>{
 this.setState({deleteConfirmDialog:value})
 }
  setEditDialogValue=(value)=>{
    this.setState({editDialog:value})
  }
  setEditConfirmDialogStateValues=(value)=>{
 this.setState({editConfirmDialog:value})
 }

//  ***********************ADD EDIT DELETE Dialog******************************

 stateSetDialogOpen=(value)=>{
  console.log("call")
this.setState({setDialogOpen:value})
}
stateSetDialogOpen1=(value)=>{
  console.log("call")
this.setState({setDialogOpen1:value})
}
stateAddSetDialogOpen=(value)=>{
    this.setState({setAddDialogOpen:value})
}


// ***********************



  addWhiteListToDatabase = async (reqObj) => {
    let [error, totalAccounts] = await Utils.parseResponse(
      AddService.addWhitelistedAddress(reqObj)
    );
    Utils.apiSuccessToast("Proposal Created Successfully");
  };

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  getTransactionReceipt = async (hash) => {
    let web3;
    web3 = new Web3(window.web3.currentProvider);
    let count = 0;
    while (true) {
      count++;
      const receipt = await web3.eth.getTransactionReceipt(hash);
      if (receipt !== null || count > 10) {
        return true;
      }
      await this.delay(3000);
    }
  };

  onEditAddress = async (reqObj) => {
    this.setState({editDialog:true})
    let web3;
    web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    if (!accounts || !accounts.length) {
      Utils.apiFailureToast("Please login to Xinpay extension");
      return;
    }
    const acc = accounts[0];
    const contract = new web3.eth.Contract(
      masterContractAbi,
      process.env.REACT_APP_MASTER_CONTRACT_ADDRESS
      // "0xc96b57A8F1A98278007B559Dc8A8B343e3559F6a"
    );
    console.log("req", reqObj);
    return new Promise((resolve, reject) => {
      contract.methods
        .edit_whitelist_address(
          reqObj.address,
          reqObj.updateAddress,
          reqObj.permission.allowProposalCreation,
          reqObj.permission.allowVoting
        )
        .send({ from: acc }, async (err, transactionHash) => {
          if (err || !transactionHash) {
            reject(false);
            this.setState({setDialogOpen1:false})
            return;
          }
         
          const res = await this.getTransactionReceipt(transactionHash);
          if (res)
          //  Utils.apiSuccessToast("Address updated successfully");
          resolve(true);
        });
    });
  };

  deleteAddress = async (reqObj) => {
    this.setState({deleteDialog:true})
    let web3;
    web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    if (!accounts || !accounts.length) {
      Utils.apiFailureToast("Please login to Xinpay extension");
      return;
    }
    const acc = accounts[0];
    const contract = new web3.eth.Contract(
      masterContractAbi, 
      process.env.REACT_APP_MASTER_CONTRACT_ADDRESS
      // "0xc96b57A8F1A98278007B559Dc8A8B343e3559F6a"
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .delete_whitelist_address(reqObj.address)
        .send({ from: acc }, async (err, transactionHash) => {
          if (err || !transactionHash) {
            reject(false);
            this.setState({setDialogOpen:false})
            return;
          }
         
          const res = await this.getTransactionReceipt(transactionHash);
          if (res) 
         
          // Utils.apiSuccessToast("Address Deleted Successfully");
          resolve(true);
        });
    });
  };

  render() {
    return (
     
      <DashboardComponent
        addWhiteListAddress={this.addWhiteListAddress}
        onEditAddress={this.onEditAddress}
        deleteAddress={this.deleteAddress}
        state={this.state}
        setStateValues={this.setStateValues}
        setConfirmDialogStateValues={this.setConfirmDialogStateValues}
        setDeleteDialogValue={this.setDeleteDialogValue}
        setDeleteConfirmDialogStateValues={this.setDeleteConfirmDialogStateValues}
        setEditDialogValue={this.setEditDialogValue}
        setEditConfirmDialogStateValues={this.setEditConfirmDialogStateValues}
        setDialogOpen={this.setDialogOpen}
        stateSetDialogOpen={this.stateSetDialogOpen}
        setDialogOpen1={this.setDialogOpen1}
        stateSetDialogOpen1={this.stateSetDialogOpen1}
        setAddDialogOpen={this.setAddDialogOpen}
        stateAddSetDialogOpen={this.stateAddSetDialogOpen}
       
       
      />
      
    );


  }
}
