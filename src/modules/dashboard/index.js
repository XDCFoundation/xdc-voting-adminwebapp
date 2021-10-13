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
      "0x89CfE6bb2a708A336dEBcD8A6DE028146Ab1f841"
    );
    const res = await contract.methods
      .add_whitelist_address(reqObj.address)
      .send({ from: acc });
    console.log(res);
    Utils.apiSuccessToast("Proposal Created Successfully");

    let [error, totalAccounts] = await Utils.parseResponse(
      AddService.addWhitelistedAddress(reqObj)
    );
    return totalAccounts;
  };

  render() {
    return (
      <DashboardComponent addWhiteListAddress={this.addWhiteListAddress} />
    );
  }
}
