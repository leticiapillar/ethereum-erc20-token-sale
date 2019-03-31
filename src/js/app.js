App = {
    web3Provider: null,
    contracts: {},
    account: "0x0",
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 750000,

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

            App.listenForEvents();
            return App.render();
        })
    },

    // Listen for events emitted from the contract
    listenForEvents: function () {
        App.contracts.ERC20TokenSale.deployed().then(function (instance) {
            instance.Sell({}, {
                fromBlock: 0,
                toBlock: 'latest',
            }).watch(function (error, event) {
                console.log("event triggered", event);
                App.render();
            })
        })
    },

    render: function () {
        if (App.loading) {
            return;
        }
        App.loading = true;

        var loader = $('#loader');
        var content = $('#content');

        loader.show();
        content.hide();

        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            // if return null where using MetaMask plugin, observe the Setting > Security > Privacy mode must off
            // https://github.com/MetaMask/metamask-extension/issues/5716
            console.log('get coinbase account: ', account);
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
            }
        });

        //Load token sale contract
        App.contracts.ERC20TokenSale.deployed().then(function (instance) {
            erc20TokenSaleInstance = instance;
            return erc20TokenSaleInstance.tokenPrice();
        }).then(function (tokenPrice) {
            App.tokenPrice = tokenPrice;
            $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
            return erc20TokenSaleInstance.tokensSold();
        }).then(function (tokensSold) {
            App.tokensSold = tokensSold.toNumber();
            $('.tokens-sold').html(App.tokensSold);
            $('.tokens-available').html(App.tokensAvailable);

            var progressPercent = (App.tokensSold / App.tokensAvailable) * 100;
            $('#progress').css('width', progressPercent + '%');

            //Load token contract
            App.contracts.ERC20Token.deployed().then(function (instance) {
                erc20TokenInstance = instance;
                return erc20TokenInstance.balanceOf(App.account);
            }).then(function (balanceOf) {
                console.log('balanceOf: ', balanceOf);
                $('.dapp-balance').html(balanceOf.toNumber());

                App.loading = false;
                loader.hide();
                content.show();
            });
        });
    },

    buyTokens: function () {
        console.log("call buyTokens...");
        $('#loader').show();
        $('#content').hide();

        var numberOfTokens = $('#numberOfTokens').val();
        console.log("numberOfTokens buy: ", numberOfTokens);

        App.contracts.ERC20TokenSale.deployed().then(function (instance) {
            return instance.buyTokens(numberOfTokens, {
                from: App.account,
                value: numberOfTokens * App.tokenPrice,
                gas: 500000 // Gas limit
            });
        }).then(function (result) {
            console.log("Tokens bought...")
            $('form').trigger('reset') // reset number of tokens in form
            // Wait for Sell event
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

