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

// SupplychainMetaData contains all meta data concerning the Supplychain contract.
var SupplychainMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"itemId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"status\",\"type\":\"string\"}],\"name\":\"ItemAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"itemId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"newStatus\",\"type\":\"string\"}],\"name\":\"StatusUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"TimeUpdated\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"items\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"status\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[],\"name\":\"lastUpdatedTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[],\"name\":\"oracle\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_oracle\",\"type\":\"address\"}],\"name\":\"setOracle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"itemId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"status\",\"type\":\"string\"}],\"name\":\"addItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"itemId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"newStatus\",\"type\":\"string\"}],\"name\":\"updateStatus\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"itemId\",\"type\":\"uint256\"}],\"name\":\"getItem\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_time\",\"type\":\"uint256\"}],\"name\":\"updateTime\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true}]",
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

// GetItem is a free data retrieval call binding the contract method 0x3129e773.
//
// Solidity: function getItem(uint256 itemId) view returns(string, string)
func (_Supplychain *SupplychainCaller) GetItem(opts *bind.CallOpts, itemId *big.Int) (string, string, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "getItem", itemId)

	if err != nil {
		return *new(string), *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)
	out1 := *abi.ConvertType(out[1], new(string)).(*string)

	return out0, out1, err

}

// GetItem is a free data retrieval call binding the contract method 0x3129e773.
//
// Solidity: function getItem(uint256 itemId) view returns(string, string)
func (_Supplychain *SupplychainSession) GetItem(itemId *big.Int) (string, string, error) {
	return _Supplychain.Contract.GetItem(&_Supplychain.CallOpts, itemId)
}

// GetItem is a free data retrieval call binding the contract method 0x3129e773.
//
// Solidity: function getItem(uint256 itemId) view returns(string, string)
func (_Supplychain *SupplychainCallerSession) GetItem(itemId *big.Int) (string, string, error) {
	return _Supplychain.Contract.GetItem(&_Supplychain.CallOpts, itemId)
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

// Items is a free data retrieval call binding the contract method 0xbfb231d2.
//
// Solidity: function items(uint256 ) view returns(string name, string status)
func (_Supplychain *SupplychainCaller) Items(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Name   string
	Status string
}, error) {
	var out []interface{}
	err := _Supplychain.contract.Call(opts, &out, "items", arg0)

	outstruct := new(struct {
		Name   string
		Status string
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Name = *abi.ConvertType(out[0], new(string)).(*string)
	outstruct.Status = *abi.ConvertType(out[1], new(string)).(*string)

	return *outstruct, err

}

// Items is a free data retrieval call binding the contract method 0xbfb231d2.
//
// Solidity: function items(uint256 ) view returns(string name, string status)
func (_Supplychain *SupplychainSession) Items(arg0 *big.Int) (struct {
	Name   string
	Status string
}, error) {
	return _Supplychain.Contract.Items(&_Supplychain.CallOpts, arg0)
}

// Items is a free data retrieval call binding the contract method 0xbfb231d2.
//
// Solidity: function items(uint256 ) view returns(string name, string status)
func (_Supplychain *SupplychainCallerSession) Items(arg0 *big.Int) (struct {
	Name   string
	Status string
}, error) {
	return _Supplychain.Contract.Items(&_Supplychain.CallOpts, arg0)
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

// AddItem is a paid mutator transaction binding the contract method 0xcb544212.
//
// Solidity: function addItem(uint256 itemId, string name, string status) returns()
func (_Supplychain *SupplychainTransactor) AddItem(opts *bind.TransactOpts, itemId *big.Int, name string, status string) (*types.Transaction, error) {
	return _Supplychain.contract.Transact(opts, "addItem", itemId, name, status)
}

// AddItem is a paid mutator transaction binding the contract method 0xcb544212.
//
// Solidity: function addItem(uint256 itemId, string name, string status) returns()
func (_Supplychain *SupplychainSession) AddItem(itemId *big.Int, name string, status string) (*types.Transaction, error) {
	return _Supplychain.Contract.AddItem(&_Supplychain.TransactOpts, itemId, name, status)
}

// AddItem is a paid mutator transaction binding the contract method 0xcb544212.
//
// Solidity: function addItem(uint256 itemId, string name, string status) returns()
func (_Supplychain *SupplychainTransactorSession) AddItem(itemId *big.Int, name string, status string) (*types.Transaction, error) {
	return _Supplychain.Contract.AddItem(&_Supplychain.TransactOpts, itemId, name, status)
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

// UpdateStatus is a paid mutator transaction binding the contract method 0xd1b34dd8.
//
// Solidity: function updateStatus(uint256 itemId, string newStatus) returns()
func (_Supplychain *SupplychainTransactor) UpdateStatus(opts *bind.TransactOpts, itemId *big.Int, newStatus string) (*types.Transaction, error) {
	return _Supplychain.contract.Transact(opts, "updateStatus", itemId, newStatus)
}

// UpdateStatus is a paid mutator transaction binding the contract method 0xd1b34dd8.
//
// Solidity: function updateStatus(uint256 itemId, string newStatus) returns()
func (_Supplychain *SupplychainSession) UpdateStatus(itemId *big.Int, newStatus string) (*types.Transaction, error) {
	return _Supplychain.Contract.UpdateStatus(&_Supplychain.TransactOpts, itemId, newStatus)
}

// UpdateStatus is a paid mutator transaction binding the contract method 0xd1b34dd8.
//
// Solidity: function updateStatus(uint256 itemId, string newStatus) returns()
func (_Supplychain *SupplychainTransactorSession) UpdateStatus(itemId *big.Int, newStatus string) (*types.Transaction, error) {
	return _Supplychain.Contract.UpdateStatus(&_Supplychain.TransactOpts, itemId, newStatus)
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

// SupplychainItemAddedIterator is returned from FilterItemAdded and is used to iterate over the raw logs and unpacked data for ItemAdded events raised by the Supplychain contract.
type SupplychainItemAddedIterator struct {
	Event *SupplychainItemAdded // Event containing the contract specifics and raw log

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
func (it *SupplychainItemAddedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SupplychainItemAdded)
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
		it.Event = new(SupplychainItemAdded)
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
func (it *SupplychainItemAddedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SupplychainItemAddedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SupplychainItemAdded represents a ItemAdded event raised by the Supplychain contract.
type SupplychainItemAdded struct {
	ItemId *big.Int
	Name   string
	Status string
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterItemAdded is a free log retrieval operation binding the contract event 0x9a2ee66360acc47ed8f7c49b2492e1777a6fed40c18be4eddb5b242f7098a4af.
//
// Solidity: event ItemAdded(uint256 itemId, string name, string status)
func (_Supplychain *SupplychainFilterer) FilterItemAdded(opts *bind.FilterOpts) (*SupplychainItemAddedIterator, error) {

	logs, sub, err := _Supplychain.contract.FilterLogs(opts, "ItemAdded")
	if err != nil {
		return nil, err
	}
	return &SupplychainItemAddedIterator{contract: _Supplychain.contract, event: "ItemAdded", logs: logs, sub: sub}, nil
}

// WatchItemAdded is a free log subscription operation binding the contract event 0x9a2ee66360acc47ed8f7c49b2492e1777a6fed40c18be4eddb5b242f7098a4af.
//
// Solidity: event ItemAdded(uint256 itemId, string name, string status)
func (_Supplychain *SupplychainFilterer) WatchItemAdded(opts *bind.WatchOpts, sink chan<- *SupplychainItemAdded) (event.Subscription, error) {

	logs, sub, err := _Supplychain.contract.WatchLogs(opts, "ItemAdded")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SupplychainItemAdded)
				if err := _Supplychain.contract.UnpackLog(event, "ItemAdded", log); err != nil {
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

// ParseItemAdded is a log parse operation binding the contract event 0x9a2ee66360acc47ed8f7c49b2492e1777a6fed40c18be4eddb5b242f7098a4af.
//
// Solidity: event ItemAdded(uint256 itemId, string name, string status)
func (_Supplychain *SupplychainFilterer) ParseItemAdded(log types.Log) (*SupplychainItemAdded, error) {
	event := new(SupplychainItemAdded)
	if err := _Supplychain.contract.UnpackLog(event, "ItemAdded", log); err != nil {
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
	ItemId    *big.Int
	NewStatus string
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterStatusUpdated is a free log retrieval operation binding the contract event 0xdc280875b120650ffe3edf5f724f07fd086361a32c2a387fe34b495f5679e77d.
//
// Solidity: event StatusUpdated(uint256 itemId, string newStatus)
func (_Supplychain *SupplychainFilterer) FilterStatusUpdated(opts *bind.FilterOpts) (*SupplychainStatusUpdatedIterator, error) {

	logs, sub, err := _Supplychain.contract.FilterLogs(opts, "StatusUpdated")
	if err != nil {
		return nil, err
	}
	return &SupplychainStatusUpdatedIterator{contract: _Supplychain.contract, event: "StatusUpdated", logs: logs, sub: sub}, nil
}

// WatchStatusUpdated is a free log subscription operation binding the contract event 0xdc280875b120650ffe3edf5f724f07fd086361a32c2a387fe34b495f5679e77d.
//
// Solidity: event StatusUpdated(uint256 itemId, string newStatus)
func (_Supplychain *SupplychainFilterer) WatchStatusUpdated(opts *bind.WatchOpts, sink chan<- *SupplychainStatusUpdated) (event.Subscription, error) {

	logs, sub, err := _Supplychain.contract.WatchLogs(opts, "StatusUpdated")
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

// ParseStatusUpdated is a log parse operation binding the contract event 0xdc280875b120650ffe3edf5f724f07fd086361a32c2a387fe34b495f5679e77d.
//
// Solidity: event StatusUpdated(uint256 itemId, string newStatus)
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
