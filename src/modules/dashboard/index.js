import React from "react";
import BaseComponent from "../baseComponent";
import Web3 from "web3";
import DashboardComponent from "./dashboardComponent";
import Utils from "../../utility";
import { AddService } from "../../services";

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
    };
  }

  async componentDidMount() {}

  addWhiteListAddress = async (reqObj) => {
    this.setState({addDialog:true})
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
      "0x85fe7c9734585a494b03c1a450ab0e9b79557cc4"
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
            return;
          }
         
          const res = await this.getTransactionReceipt(transactionHash, reqObj);
          if (res) {
           
            // this.props.setAddPopup(true)
            let [error, totalAccounts] = await Utils.parseResponse(
              AddService.addWhitelistedAddress(reqObj)
            );
            // Utils.apiSuccessToast("Proposal Created Successfully");
          }
          resolve(true);
        });
    });
  };

   setStateValues=(value)=>{
     console.log("call")
  this.setState({addDialog:value})
  }
  setConfirmDialogStateValues=(value)=>{
    console.log("call")
 this.setState({addConfirmDialog:value})
 }
  setDeleteDialogValue=(value)=>{
    this.setState({deleteDialog:value})
  }
  setDeleteConfirmDialogStateValues=(value)=>{
    console.log("call")
 this.setState({deleteConfirmDialog:value})
 }
  setEditDialogValue=(value)=>{
    this.setState({editDialog:value})
  }
  setEditConfirmDialogStateValues=(value)=>{
    console.log("call")
 this.setState({editConfirmDialog:value})
 }

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
      "0x85fe7c9734585a494b03c1a450ab0e9b79557cc4"
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
      "0x85fe7c9734585a494b03c1a450ab0e9b79557cc4"
    );

    return new Promise((resolve, reject) => {
      contract.methods
        .delete_whitelist_address(reqObj.address)
        .send({ from: acc }, async (err, transactionHash) => {
          if (err || !transactionHash) {
            reject(false);
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
      />
    );


  }
}
