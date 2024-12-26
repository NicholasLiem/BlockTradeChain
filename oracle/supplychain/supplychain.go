// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package supplychain

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// SupplyChainItem is an auto generated low-level Go binding around an user-defined struct.
type SupplyChainItem struct {
	Product          string
	Qty              *big.Int
	Value            *big.Int
	Exporter         common.Address
	Recipient        common.Address
	Status           string
	StatusTimestamps []*big.Int
}

// SupplychainMetaData contains all meta data concerning the Supplychain contract.
var SupplychainMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"transactionHash\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"exporter\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"ItemExported\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"transactionHash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"newStatus\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"StatusUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"TimeUpdated\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"lastUpdatedTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[],\"name\":\"oracle\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"transactionHashes\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_oracle\",\"type\":\"address\"}],\"name\":\"setOracle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"product\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"qty\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"exportItem\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"transactionHash\",\"type\":\"bytes32\"}],\"name\":\"confirmItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"transactionHash\",\"type\":\"bytes32\"}],\"name\":\"denyItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"transactionHash\",\"type\":\"bytes32\"}],\"name\":\"getItemDetails\",\"outputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"product\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"qty\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"exporter\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"status\",\"type\":\"string\"},{\"internalType\":\"uint256[]\",\"name\":\"statusTimestamps\",\"type\":\"uint256[]\"}],\"internalType\":\"structSupplyChain.Item\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"transactionHash\",\"type\":\"bytes32\"}],\"name\":\"getStatusLog\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"transactionHash\",\"type\":\"bytes32\"}],\"name\":\"getDebugDetails\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[],\"name\":\"getAllItems\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"},{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"},{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"},{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_time\",\"type\":\"uint256\"}],\"name\":\"updateTime\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true}]",
}

// SupplychainABI is the input ABI used to generate the binding from.
// Deprecated: Use SupplychainMetaData.ABI instead.
var SupplychainABI = SupplychainMetaData.ABI

// Supplychain is an auto generated Go binding around an Ethereum contract.
type Supplychain struct {
	SupplychainCaller     // Read-only binding to the contract
	SupplychainTransactor // Write-only binding to the contract
	SupplychainFilterer   // Log filterer for contract events
}

// SupplychainCaller is an auto generated read-only Go binding around an Ethereum contract.
type SupplychainCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SupplychainTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SupplychainTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SupplychainFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SupplychainFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SupplychainSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SupplychainSession struct {
	Contract     *Supplychain      // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SupplychainCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SupplychainCallerSession struct {
	Contract *SupplychainCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts      // Call options to use throughout this session
}

// SupplychainTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SupplychainTransactorSession struct {
	Contract     *SupplychainTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts      // Transaction auth options to use throughout this session
}

// SupplychainRaw is an auto generated low-level Go binding around an Ethereum contract.
type SupplychainRaw struct {
	Contract *Supplychain // Generic contract binding to access the raw methods on
}

// SupplychainCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SupplychainCallerRaw struct {
	Contract *SupplychainCaller // Generic read-only contract binding to access the raw methods on
}

// SupplychainTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SupplychainTransactorRaw struct {
	Contract *SupplychainTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSupplychain creates a new instance of Supplychain, bound to a specific deployed contract.
func NewSupplychain(address common.Address, backend bind.ContractBackend) (*Supplychain, error) {
	contract, err := bindSupplychain(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Supplychain{SupplychainCaller: SupplychainCaller{contract: contract}, SupplychainTransactor: SupplychainTransactor{contract: contract}, SupplychainFilterer: SupplychainFilterer{contract: contract}}, nil
}

// NewSupplychainCaller creates a new read-only instance of Supplychain, bound to a specific deployed contract.
func NewSupplychainCaller(address common.Address, caller bind.ContractCaller) (*SupplychainCaller, error) {
	contract, err := bindSupplychain(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SupplychainCaller{contract: contract}, nil
}

// NewSupplychainTransactor creates a new write-only instance of Supplychain, bound to a specific deployed contract.
func NewSupplychainTransactor(address common.Address, transactor bind.ContractTransactor) (*SupplychainTransactor, error) {
	contract, err := bindSupplychain(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SupplychainTransactor{contract: contract}, nil
}

// NewSupplychainFilterer creates a new log filterer instance of Supplychain, bound to a specific deployed contract.
func NewSupplychainFilterer(address common.Address, filterer bind.ContractFilterer) (*SupplychainFilterer, error) {
	contract, err := bindSupplychain(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SupplychainFilterer{contract: contract}, nil
}

// bindSupplychain binds a generic wrapper to an already deployed contract.
func bindSupplychain(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := SupplychainMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Supplychain *SupplychainRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Supplychain.Contract.SupplychainCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Supplychain *SupplychainRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Supplychain.Contract.SupplychainTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Supplychain *SupplychainRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Supplychain.Contract.SupplychainTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Supplychain *SupplychainCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Supplychain.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Supplychain *SupplychainTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Supplychain.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Supplychain *SupplychainTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Supplychain.Contract.contract.Transact(opts, method, params...)
}

// GetAllItems is a free data retrieval call binding the contract method 0x4ba1d6aa.
//
// Solidity: function getAllItems() view returns(bytes32[], string[], uint256[], uint256[], address[], address[], string[])
func (_Supplychain *SupplychainCaller) GetAllItems(opts *bind.CallOpts) ([][32]byte, []string, []*big.Int, []*big.Int, []common.Address, []common.Address, []string, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "getAllItems")

	if err != nil {
		return *new([][32]byte), *new([]string), *new([]*big.Int), *new([]*big.Int), *new([]common.Address), *new([]common.Address), *new([]string), err
	}

	out0 := *abi.ConvertType(out[0], new([][32]byte)).(*[][32]byte)
	out1 := *abi.ConvertType(out[1], new([]string)).(*[]string)
	out2 := *abi.ConvertType(out[2], new([]*big.Int)).(*[]*big.Int)
	out3 := *abi.ConvertType(out[3], new([]*big.Int)).(*[]*big.Int)
	out4 := *abi.ConvertType(out[4], new([]common.Address)).(*[]common.Address)
	out5 := *abi.ConvertType(out[5], new([]common.Address)).(*[]common.Address)
	out6 := *abi.ConvertType(out[6], new([]string)).(*[]string)

	return out0, out1, out2, out3, out4, out5, out6, err

}

// GetAllItems is a free data retrieval call binding the contract method 0x4ba1d6aa.
//
// Solidity: function getAllItems() view returns(bytes32[], string[], uint256[], uint256[], address[], address[], string[])
func (_Supplychain *SupplychainSession) GetAllItems() ([][32]byte, []string, []*big.Int, []*big.Int, []common.Address, []common.Address, []string, error) {
	return _Supplychain.Contract.GetAllItems(&_Supplychain.CallOpts)
}

// GetAllItems is a free data retrieval call binding the contract method 0x4ba1d6aa.
//
// Solidity: function getAllItems() view returns(bytes32[], string[], uint256[], uint256[], address[], address[], string[])
func (_Supplychain *SupplychainCallerSession) GetAllItems() ([][32]byte, []string, []*big.Int, []*big.Int, []common.Address, []common.Address, []string, error) {
	return _Supplychain.Contract.GetAllItems(&_Supplychain.CallOpts)
}

// GetDebugDetails is a free data retrieval call binding the contract method 0x310230e4.
//
// Solidity: function getDebugDetails(bytes32 transactionHash) view returns(address, address)
func (_Supplychain *SupplychainCaller) GetDebugDetails(opts *bind.CallOpts, transactionHash [32]byte) (common.Address, common.Address, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "getDebugDetails", transactionHash)

	if err != nil {
		return *new(common.Address), *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	out1 := *abi.ConvertType(out[1], new(common.Address)).(*common.Address)

	return out0, out1, err

}

// GetDebugDetails is a free data retrieval call binding the contract method 0x310230e4.
//
// Solidity: function getDebugDetails(bytes32 transactionHash) view returns(address, address)
func (_Supplychain *SupplychainSession) GetDebugDetails(transactionHash [32]byte) (common.Address, common.Address, error) {
	return _Supplychain.Contract.GetDebugDetails(&_Supplychain.CallOpts, transactionHash)
}

// GetDebugDetails is a free data retrieval call binding the contract method 0x310230e4.
//
// Solidity: function getDebugDetails(bytes32 transactionHash) view returns(address, address)
func (_Supplychain *SupplychainCallerSession) GetDebugDetails(transactionHash [32]byte) (common.Address, common.Address, error) {
	return _Supplychain.Contract.GetDebugDetails(&_Supplychain.CallOpts, transactionHash)
}

// GetItemDetails is a free data retrieval call binding the contract method 0xd1e3d120.
//
// Solidity: function getItemDetails(bytes32 transactionHash) view returns((string,uint256,uint256,address,address,string,uint256[]))
func (_Supplychain *SupplychainCaller) GetItemDetails(opts *bind.CallOpts, transactionHash [32]byte) (SupplyChainItem, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "getItemDetails", transactionHash)

	if err != nil {
		return *new(SupplyChainItem), err
	}

	out0 := *abi.ConvertType(out[0], new(SupplyChainItem)).(*SupplyChainItem)

	return out0, err

}

// GetItemDetails is a free data retrieval call binding the contract method 0xd1e3d120.
//
// Solidity: function getItemDetails(bytes32 transactionHash) view returns((string,uint256,uint256,address,address,string,uint256[]))
func (_Supplychain *SupplychainSession) GetItemDetails(transactionHash [32]byte) (SupplyChainItem, error) {
	return _Supplychain.Contract.GetItemDetails(&_Supplychain.CallOpts, transactionHash)
}

// GetItemDetails is a free data retrieval call binding the contract method 0xd1e3d120.
//
// Solidity: function getItemDetails(bytes32 transactionHash) view returns((string,uint256,uint256,address,address,string,uint256[]))
func (_Supplychain *SupplychainCallerSession) GetItemDetails(transactionHash [32]byte) (SupplyChainItem, error) {
	return _Supplychain.Contract.GetItemDetails(&_Supplychain.CallOpts, transactionHash)
}

// GetStatusLog is a free data retrieval call binding the contract method 0x6f8d7401.
//
// Solidity: function getStatusLog(bytes32 transactionHash) view returns(uint256[])
func (_Supplychain *SupplychainCaller) GetStatusLog(opts *bind.CallOpts, transactionHash [32]byte) ([]*big.Int, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "getStatusLog", transactionHash)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetStatusLog is a free data retrieval call binding the contract method 0x6f8d7401.
//
// Solidity: function getStatusLog(bytes32 transactionHash) view returns(uint256[])
func (_Supplychain *SupplychainSession) GetStatusLog(transactionHash [32]byte) ([]*big.Int, error) {
	return _Supplychain.Contract.GetStatusLog(&_Supplychain.CallOpts, transactionHash)
}

// GetStatusLog is a free data retrieval call binding the contract method 0x6f8d7401.
//
// Solidity: function getStatusLog(bytes32 transactionHash) view returns(uint256[])
func (_Supplychain *SupplychainCallerSession) GetStatusLog(transactionHash [32]byte) ([]*big.Int, error) {
	return _Supplychain.Contract.GetStatusLog(&_Supplychain.CallOpts, transactionHash)
}

// GetTime is a free data retrieval call binding the contract method 0x557ed1ba.
//
// Solidity: function getTime() view returns(uint256)
func (_Supplychain *SupplychainCaller) GetTime(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "getTime")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetTime is a free data retrieval call binding the contract method 0x557ed1ba.
//
// Solidity: function getTime() view returns(uint256)
func (_Supplychain *SupplychainSession) GetTime() (*big.Int, error) {
	return _Supplychain.Contract.GetTime(&_Supplychain.CallOpts)
}

// GetTime is a free data retrieval call binding the contract method 0x557ed1ba.
//
// Solidity: function getTime() view returns(uint256)
func (_Supplychain *SupplychainCallerSession) GetTime() (*big.Int, error) {
	return _Supplychain.Contract.GetTime(&_Supplychain.CallOpts)
}

// LastUpdatedTime is a free data retrieval call binding the contract method 0xbf856895.
//
// Solidity: function lastUpdatedTime() view returns(uint256)
func (_Supplychain *SupplychainCaller) LastUpdatedTime(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "lastUpdatedTime")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// LastUpdatedTime is a free data retrieval call binding the contract method 0xbf856895.
//
// Solidity: function lastUpdatedTime() view returns(uint256)
func (_Supplychain *SupplychainSession) LastUpdatedTime() (*big.Int, error) {
	return _Supplychain.Contract.LastUpdatedTime(&_Supplychain.CallOpts)
}

// LastUpdatedTime is a free data retrieval call binding the contract method 0xbf856895.
//
// Solidity: function lastUpdatedTime() view returns(uint256)
func (_Supplychain *SupplychainCallerSession) LastUpdatedTime() (*big.Int, error) {
	return _Supplychain.Contract.LastUpdatedTime(&_Supplychain.CallOpts)
}

// Oracle is a free data retrieval call binding the contract method 0x7dc0d1d0.
//
// Solidity: function oracle() view returns(address)
func (_Supplychain *SupplychainCaller) Oracle(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "oracle")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Oracle is a free data retrieval call binding the contract method 0x7dc0d1d0.
//
// Solidity: function oracle() view returns(address)
func (_Supplychain *SupplychainSession) Oracle() (common.Address, error) {
	return _Supplychain.Contract.Oracle(&_Supplychain.CallOpts)
}

// Oracle is a free data retrieval call binding the contract method 0x7dc0d1d0.
//
// Solidity: function oracle() view returns(address)
func (_Supplychain *SupplychainCallerSession) Oracle() (common.Address, error) {
	return _Supplychain.Contract.Oracle(&_Supplychain.CallOpts)
}

// TransactionHashes is a free data retrieval call binding the contract method 0x213dafcd.
//
// Solidity: function transactionHashes(uint256 ) view returns(bytes32)
func (_Supplychain *SupplychainCaller) TransactionHashes(opts *bind.CallOpts, arg0 *big.Int) ([32]byte, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "transactionHashes", arg0)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// TransactionHashes is a free data retrieval call binding the contract method 0x213dafcd.
//
// Solidity: function transactionHashes(uint256 ) view returns(bytes32)
func (_Supplychain *SupplychainSession) TransactionHashes(arg0 *big.Int) ([32]byte, error) {
	return _Supplychain.Contract.TransactionHashes(&_Supplychain.CallOpts, arg0)
}

// TransactionHashes is a free data retrieval call binding the contract method 0x213dafcd.
//
// Solidity: function transactionHashes(uint256 ) view returns(bytes32)
func (_Supplychain *SupplychainCallerSession) TransactionHashes(arg0 *big.Int) ([32]byte, error) {
	return _Supplychain.Contract.TransactionHashes(&_Supplychain.CallOpts, arg0)
}

// ConfirmItem is a paid mutator transaction binding the contract method 0xfc9ed250.
//
// Solidity: function confirmItem(bytes32 transactionHash) returns()
func (_Supplychain *SupplychainTransactor) ConfirmItem(opts *bind.TransactOpts, transactionHash [32]byte) (*types.Transaction, error) {
	return _Supplychain.contract.Transact(opts, "confirmItem", transactionHash)
}

// ConfirmItem is a paid mutator transaction binding the contract method 0xfc9ed250.
//
// Solidity: function confirmItem(bytes32 transactionHash) returns()
func (_Supplychain *SupplychainSession) ConfirmItem(transactionHash [32]byte) (*types.Transaction, error) {
	return _Supplychain.Contract.ConfirmItem(&_Supplychain.TransactOpts, transactionHash)
}

// ConfirmItem is a paid mutator transaction binding the contract method 0xfc9ed250.
//
// Solidity: function confirmItem(bytes32 transactionHash) returns()
func (_Supplychain *SupplychainTransactorSession) ConfirmItem(transactionHash [32]byte) (*types.Transaction, error) {
	return _Supplychain.Contract.ConfirmItem(&_Supplychain.TransactOpts, transactionHash)
}

// DenyItem is a paid mutator transaction binding the contract method 0xa49e5f2c.
//
// Solidity: function denyItem(bytes32 transactionHash) returns()
func (_Supplychain *SupplychainTransactor) DenyItem(opts *bind.TransactOpts, transactionHash [32]byte) (*types.Transaction, error) {
	return _Supplychain.contract.Transact(opts, "denyItem", transactionHash)
}

// DenyItem is a paid mutator transaction binding the contract method 0xa49e5f2c.
//
// Solidity: function denyItem(bytes32 transactionHash) returns()
func (_Supplychain *SupplychainSession) DenyItem(transactionHash [32]byte) (*types.Transaction, error) {
	return _Supplychain.Contract.DenyItem(&_Supplychain.TransactOpts, transactionHash)
}

// DenyItem is a paid mutator transaction binding the contract method 0xa49e5f2c.
//
// Solidity: function denyItem(bytes32 transactionHash) returns()
func (_Supplychain *SupplychainTransactorSession) DenyItem(transactionHash [32]byte) (*types.Transaction, error) {
	return _Supplychain.Contract.DenyItem(&_Supplychain.TransactOpts, transactionHash)
}

// ExportItem is a paid mutator transaction binding the contract method 0xc3b77da8.
//
// Solidity: function exportItem(string product, uint256 qty, uint256 value, address recipient) returns(bytes32)
func (_Supplychain *SupplychainTransactor) ExportItem(opts *bind.TransactOpts, product string, qty *big.Int, value *big.Int, recipient common.Address) (*types.Transaction, error) {
	return _Supplychain.contract.Transact(opts, "exportItem", product, qty, value, recipient)
}

// ExportItem is a paid mutator transaction binding the contract method 0xc3b77da8.
//
// Solidity: function exportItem(string product, uint256 qty, uint256 value, address recipient) returns(bytes32)
func (_Supplychain *SupplychainSession) ExportItem(product string, qty *big.Int, value *big.Int, recipient common.Address) (*types.Transaction, error) {
	return _Supplychain.Contract.ExportItem(&_Supplychain.TransactOpts, product, qty, value, recipient)
}

// ExportItem is a paid mutator transaction binding the contract method 0xc3b77da8.
//
// Solidity: function exportItem(string product, uint256 qty, uint256 value, address recipient) returns(bytes32)
func (_Supplychain *SupplychainTransactorSession) ExportItem(product string, qty *big.Int, value *big.Int, recipient common.Address) (*types.Transaction, error) {
	return _Supplychain.Contract.ExportItem(&_Supplychain.TransactOpts, product, qty, value, recipient)
}

// SetOracle is a paid mutator transaction binding the contract method 0x7adbf973.
//
// Solidity: function setOracle(address _oracle) returns()
func (_Supplychain *SupplychainTransactor) SetOracle(opts *bind.TransactOpts, _oracle common.Address) (*types.Transaction, error) {
	return _Supplychain.contract.Transact(opts, "setOracle", _oracle)
}

// SetOracle is a paid mutator transaction binding the contract method 0x7adbf973.
//
// Solidity: function setOracle(address _oracle) returns()
func (_Supplychain *SupplychainSession) SetOracle(_oracle common.Address) (*types.Transaction, error) {
	return _Supplychain.Contract.SetOracle(&_Supplychain.TransactOpts, _oracle)
}

// SetOracle is a paid mutator transaction binding the contract method 0x7adbf973.
//
// Solidity: function setOracle(address _oracle) returns()
func (_Supplychain *SupplychainTransactorSession) SetOracle(_oracle common.Address) (*types.Transaction, error) {
	return _Supplychain.Contract.SetOracle(&_Supplychain.TransactOpts, _oracle)
}

// UpdateTime is a paid mutator transaction binding the contract method 0x6c59bd0c.
//
// Solidity: function updateTime(uint256 _time) returns()
func (_Supplychain *SupplychainTransactor) UpdateTime(opts *bind.TransactOpts, _time *big.Int) (*types.Transaction, error) {
	return _Supplychain.contract.Transact(opts, "updateTime", _time)
}

// UpdateTime is a paid mutator transaction binding the contract method 0x6c59bd0c.
//
// Solidity: function updateTime(uint256 _time) returns()
func (_Supplychain *SupplychainSession) UpdateTime(_time *big.Int) (*types.Transaction, error) {
	return _Supplychain.Contract.UpdateTime(&_Supplychain.TransactOpts, _time)
}

// UpdateTime is a paid mutator transaction binding the contract method 0x6c59bd0c.
//
// Solidity: function updateTime(uint256 _time) returns()
func (_Supplychain *SupplychainTransactorSession) UpdateTime(_time *big.Int) (*types.Transaction, error) {
	return _Supplychain.Contract.UpdateTime(&_Supplychain.TransactOpts, _time)
}

// SupplychainItemExportedIterator is returned from FilterItemExported and is used to iterate over the raw logs and unpacked data for ItemExported events raised by the Supplychain contract.
type SupplychainItemExportedIterator struct {
	Event *SupplychainItemExported // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SupplychainItemExportedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SupplychainItemExported)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SupplychainItemExported)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SupplychainItemExportedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SupplychainItemExportedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SupplychainItemExported represents a ItemExported event raised by the Supplychain contract.
type SupplychainItemExported struct {
	TransactionHash [32]byte
	Exporter        common.Address
	Recipient       common.Address
	Raw             types.Log // Blockchain specific contextual infos
}

// FilterItemExported is a free log retrieval operation binding the contract event 0x8cabda4ff5d88802c4200cd965df85fe466ae1fc1e011594df1b44d023c2357f.
//
// Solidity: event ItemExported(bytes32 indexed transactionHash, address indexed exporter, address indexed recipient)
func (_Supplychain *SupplychainFilterer) FilterItemExported(opts *bind.FilterOpts, transactionHash [][32]byte, exporter []common.Address, recipient []common.Address) (*SupplychainItemExportedIterator, error) {

	var transactionHashRule []interface{}
	for _, transactionHashItem := range transactionHash {
		transactionHashRule = append(transactionHashRule, transactionHashItem)
	}
	var exporterRule []interface{}
	for _, exporterItem := range exporter {
		exporterRule = append(exporterRule, exporterItem)
	}
	var recipientRule []interface{}
	for _, recipientItem := range recipient {
		recipientRule = append(recipientRule, recipientItem)
	}

	logs, sub, err := _Supplychain.contract.FilterLogs(opts, "ItemExported", transactionHashRule, exporterRule, recipientRule)
	if err != nil {
		return nil, err
	}
	return &SupplychainItemExportedIterator{contract: _Supplychain.contract, event: "ItemExported", logs: logs, sub: sub}, nil
}

// WatchItemExported is a free log subscription operation binding the contract event 0x8cabda4ff5d88802c4200cd965df85fe466ae1fc1e011594df1b44d023c2357f.
//
// Solidity: event ItemExported(bytes32 indexed transactionHash, address indexed exporter, address indexed recipient)
func (_Supplychain *SupplychainFilterer) WatchItemExported(opts *bind.WatchOpts, sink chan<- *SupplychainItemExported, transactionHash [][32]byte, exporter []common.Address, recipient []common.Address) (event.Subscription, error) {

	var transactionHashRule []interface{}
	for _, transactionHashItem := range transactionHash {
		transactionHashRule = append(transactionHashRule, transactionHashItem)
	}
	var exporterRule []interface{}
	for _, exporterItem := range exporter {
		exporterRule = append(exporterRule, exporterItem)
	}
	var recipientRule []interface{}
	for _, recipientItem := range recipient {
		recipientRule = append(recipientRule, recipientItem)
	}

	logs, sub, err := _Supplychain.contract.WatchLogs(opts, "ItemExported", transactionHashRule, exporterRule, recipientRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SupplychainItemExported)
				if err := _Supplychain.contract.UnpackLog(event, "ItemExported", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseItemExported is a log parse operation binding the contract event 0x8cabda4ff5d88802c4200cd965df85fe466ae1fc1e011594df1b44d023c2357f.
//
// Solidity: event ItemExported(bytes32 indexed transactionHash, address indexed exporter, address indexed recipient)
func (_Supplychain *SupplychainFilterer) ParseItemExported(log types.Log) (*SupplychainItemExported, error) {
	event := new(SupplychainItemExported)
	if err := _Supplychain.contract.UnpackLog(event, "ItemExported", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SupplychainStatusUpdatedIterator is returned from FilterStatusUpdated and is used to iterate over the raw logs and unpacked data for StatusUpdated events raised by the Supplychain contract.
type SupplychainStatusUpdatedIterator struct {
	Event *SupplychainStatusUpdated // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SupplychainStatusUpdatedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SupplychainStatusUpdated)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SupplychainStatusUpdated)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SupplychainStatusUpdatedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SupplychainStatusUpdatedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SupplychainStatusUpdated represents a StatusUpdated event raised by the Supplychain contract.
type SupplychainStatusUpdated struct {
	TransactionHash [32]byte
	NewStatus       string
	Timestamp       *big.Int
	Raw             types.Log // Blockchain specific contextual infos
}

// FilterStatusUpdated is a free log retrieval operation binding the contract event 0x6f2d58d35fe763ab9b31dd965e80a2ba8746ed797ec9e928ac99c40f0e9e8600.
//
// Solidity: event StatusUpdated(bytes32 indexed transactionHash, string newStatus, uint256 timestamp)
func (_Supplychain *SupplychainFilterer) FilterStatusUpdated(opts *bind.FilterOpts, transactionHash [][32]byte) (*SupplychainStatusUpdatedIterator, error) {

	var transactionHashRule []interface{}
	for _, transactionHashItem := range transactionHash {
		transactionHashRule = append(transactionHashRule, transactionHashItem)
	}

	logs, sub, err := _Supplychain.contract.FilterLogs(opts, "StatusUpdated", transactionHashRule)
	if err != nil {
		return nil, err
	}
	return &SupplychainStatusUpdatedIterator{contract: _Supplychain.contract, event: "StatusUpdated", logs: logs, sub: sub}, nil
}

// WatchStatusUpdated is a free log subscription operation binding the contract event 0x6f2d58d35fe763ab9b31dd965e80a2ba8746ed797ec9e928ac99c40f0e9e8600.
//
// Solidity: event StatusUpdated(bytes32 indexed transactionHash, string newStatus, uint256 timestamp)
func (_Supplychain *SupplychainFilterer) WatchStatusUpdated(opts *bind.WatchOpts, sink chan<- *SupplychainStatusUpdated, transactionHash [][32]byte) (event.Subscription, error) {

	var transactionHashRule []interface{}
	for _, transactionHashItem := range transactionHash {
		transactionHashRule = append(transactionHashRule, transactionHashItem)
	}

	logs, sub, err := _Supplychain.contract.WatchLogs(opts, "StatusUpdated", transactionHashRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SupplychainStatusUpdated)
				if err := _Supplychain.contract.UnpackLog(event, "StatusUpdated", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseStatusUpdated is a log parse operation binding the contract event 0x6f2d58d35fe763ab9b31dd965e80a2ba8746ed797ec9e928ac99c40f0e9e8600.
//
// Solidity: event StatusUpdated(bytes32 indexed transactionHash, string newStatus, uint256 timestamp)
func (_Supplychain *SupplychainFilterer) ParseStatusUpdated(log types.Log) (*SupplychainStatusUpdated, error) {
	event := new(SupplychainStatusUpdated)
	if err := _Supplychain.contract.UnpackLog(event, "StatusUpdated", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SupplychainTimeUpdatedIterator is returned from FilterTimeUpdated and is used to iterate over the raw logs and unpacked data for TimeUpdated events raised by the Supplychain contract.
type SupplychainTimeUpdatedIterator struct {
	Event *SupplychainTimeUpdated // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SupplychainTimeUpdatedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SupplychainTimeUpdated)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SupplychainTimeUpdated)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SupplychainTimeUpdatedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SupplychainTimeUpdatedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SupplychainTimeUpdated represents a TimeUpdated event raised by the Supplychain contract.
type SupplychainTimeUpdated struct {
	Timestamp *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterTimeUpdated is a free log retrieval operation binding the contract event 0x89c93b2d508150920890ffe8618ab7811923d95fa8770ecb495ca54cb15c7169.
//
// Solidity: event TimeUpdated(uint256 timestamp)
func (_Supplychain *SupplychainFilterer) FilterTimeUpdated(opts *bind.FilterOpts) (*SupplychainTimeUpdatedIterator, error) {

	logs, sub, err := _Supplychain.contract.FilterLogs(opts, "TimeUpdated")
	if err != nil {
		return nil, err
	}
	return &SupplychainTimeUpdatedIterator{contract: _Supplychain.contract, event: "TimeUpdated", logs: logs, sub: sub}, nil
}

// WatchTimeUpdated is a free log subscription operation binding the contract event 0x89c93b2d508150920890ffe8618ab7811923d95fa8770ecb495ca54cb15c7169.
//
// Solidity: event TimeUpdated(uint256 timestamp)
func (_Supplychain *SupplychainFilterer) WatchTimeUpdated(opts *bind.WatchOpts, sink chan<- *SupplychainTimeUpdated) (event.Subscription, error) {

	logs, sub, err := _Supplychain.contract.WatchLogs(opts, "TimeUpdated")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SupplychainTimeUpdated)
				if err := _Supplychain.contract.UnpackLog(event, "TimeUpdated", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTimeUpdated is a log parse operation binding the contract event 0x89c93b2d508150920890ffe8618ab7811923d95fa8770ecb495ca54cb15c7169.
//
// Solidity: event TimeUpdated(uint256 timestamp)
func (_Supplychain *SupplychainFilterer) ParseTimeUpdated(log types.Log) (*SupplychainTimeUpdated, error) {
	event := new(SupplychainTimeUpdated)
	if err := _Supplychain.contract.UnpackLog(event, "TimeUpdated", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
