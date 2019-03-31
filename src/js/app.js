App = {
    web3Provider: null,
    contracts: {},
    account: "0x0",

    init: function () {
        console.log("App initialized...");
        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContracts();
    },

    initContracts: function () {
        $.getJSON("ERC20TokenSale.json", function (erc20TokenSale) {
            App.contracts.ERC20TokenSale = TruffleContract(erc20TokenSale);
            App.contracts.ERC20TokenSale.setProvider(App.web3Provider);
            App.contracts.ERC20TokenSale.deployed().then(function (erc20TokenSale) {
                console.log("ERC20 Token Sale Address: ", erc20TokenSale.address);
            });
        }).done(function () {
            $.getJSON("ERC20Token.json", function (erc20Token) {
                App.contracts.ERC20Token = TruffleContract(erc20Token);
                App.contracts.ERC20Token.setProvider(App.web3Provider);
                App.contracts.ERC20Token.deployed().then(function (erc20Token) {
                    console.log("ERC20 Token Address: ", erc20Token.address);
                });
            });
            return App.render();
        })
    },

    render: function () {
        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                App.account = account;
                $('#accountAddress').html("Your Account: " + account);
            }
        });
    }
}

$(function () {
    // Error: jquery-3.3.1.min.js:2 jQuery.Deferred exception: e.indexOf is not a function TypeError: e.indexOf is not a function
    // https://stackoverflow.com/questions/38871753/uncaught-typeerror-a-indexof-is-not-a-function-error-when-opening-new-foundat/40252711#40252711
    //$(window).load(function () { App.init(); });
    $(window).on('load', function () {
        App.init();
    });
});

