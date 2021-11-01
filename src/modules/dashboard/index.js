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
    this.state = {};
  }

  async componentDidMount() {}

  addWhiteListAddress = async (reqObj) => {
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
      "0xA97c297Ab7dfFcDed29e37b307f289Eff277ABF7"
    );
    const res = await contract.methods
      .add_whitelist_address(
        reqObj.address,
        reqObj.permission.allowProposalCreation,
        reqObj.permission.allowVoting
      )
      .send({ from: acc });
    console.log(res);
    Utils.apiSuccessToast("Proposal Created Successfully");

    let [error, totalAccounts] = await Utils.parseResponse(
      AddService.addWhitelistedAddress(reqObj)
    );
    return totalAccounts;
  };

  onEditAddress = async (reqObj) => {
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
      "0xA97c297Ab7dfFcDed29e37b307f289Eff277ABF7"
    );
    const res = await contract.methods
      .edit_whitelist_address(
        reqObj.address,
        reqObj.updateAddress,
        reqObj.permission.allowProposalCreation,
        reqObj.permission.allowVoting
      )
      .send({ from: acc });
    console.log(res);
    Utils.apiSuccessToast("Address Modified Successfully");

    return true;
  };

  deleteAddress = async (reqObj) => {
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
      "0xA97c297Ab7dfFcDed29e37b307f289Eff277ABF7"
    );
    const res = await contract.methods
      .delete_whitelist_address(reqObj.address)
      .send({ from: acc });
    console.log(res);
    Utils.apiSuccessToast("Address Deleted Successfully");
    return true;
  };

  render() {
    return (
      <DashboardComponent
        addWhiteListAddress={this.addWhiteListAddress}
        onEditAddress={this.onEditAddress}
        deleteAddress={this.deleteAddress}
      />
    );
  }
}
