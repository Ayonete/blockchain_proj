App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
      // Load gems.
      $.getJSON('../gems-list.json', function(data) {
          var gemsRow = $('#gemsRow');
          var gemTemplate = $('#gemTemplate');

          for (i = 0; i < data.length; i++) {
              gemTemplate.find('.panel-title').text(data[i].name);
              gemTemplate.find('img').attr('src', data[i].picture);
              gemTemplate.find('.gem-type').text(data[i].type);
              gemTemplate.find('.gem-weight').text(data[i].weight);
              gemTemplate.find('.gem-location').text(data[i].location);
              gemTemplate.find('.btn-buy').attr('data-id', data[i].id);

              gemsRow.append(gemTemplate.html());
          }
      });

      return await App.initWeb3();
  },

  initWeb3: async function() {
      /// Modern dapp browsers...
      if (window.ethereum) {
          App.web3Provider = window.ethereum;
          try {
              // Request account access
              await window.ethereum.enable();
          } catch (error) {
              // User denied account access...
              console.error("User denied account access")
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          App.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);


      return App.initContract();
  },

  initContract: function() {
      $.getJSON('Gems.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with @truffle/contract
          var GemsArtifact = data;
          App.contracts.Gems = TruffleContract(GemsArtifact);

          // Set the provider for our contract
          App.contracts.Gems.setProvider(App.web3Provider);

          // Use our contract to retrieve and mark the adopted pets
          return App.markSold();
      });


      return App.bindEvents();
  },

  bindEvents: function() {
      $(document).on('click', '.btn-buy', App.handleBuy);
  },

  markSold: function() {
      var gemsInstance;

      App.contracts.Gems.deployed().then(function(instance) {
          gemsInstance = instance;

          return gemsInstance.getBuyers.call();
      }).then(function(buyers) {
          for (i = 0; i < buyers.length; i++) {
              if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
                  $('.panel-gem').eq(i).find('button').text('Sold Out').attr('disabled', true);
              }
          }
      }).catch(function(err) {
          console.log(err.message);
      });

  },

  handleBuy: function(event) {
      event.preventDefault();

      var itemId = parseInt($(event.target).data('id'));

      var gemsInstance;

      web3.eth.getAccounts(function(error, accounts) {
          if (error) {
              console.log(error);
          }

          var account = accounts[0];

          App.contracts.Gems.deployed().then(function(instance) {
              gemsInstance = instance;

              // Execute adopt as a transaction by sending account
              return gemsInstance.buyItem(itemId, {
                  from: account
              });
          }).then(function(result) {
              return App.markSold();
          }).catch(function(err) {
              console.log(err.message);
          });
      });

  },


};

$(function() {
  $(window).load(function() {
      App.init();
  });
});

