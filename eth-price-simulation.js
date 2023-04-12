function simulate_eth_price_change() {
  // Set up simulation parameters
  var eth_circ = 120000000; // Total Circulating Supply	ETH 
  var eth_price = 1870; // Current ETH price in USD
  var eth_staked = 16000000; // Total staked ETH supply
  var action_percent = 0.6; // Percentage of staked ETH supply taking market action
  var leverage = 3; // Average leverage used by market actors
  
  // Calculate initial ETH market cap
  var eth_market_cap = eth_price * ( eth_circ  + eth_staked);
  
  // Calculate amount of staked ETH taking market action
  var action_eth = eth_staked * action_percent * leverage;
  

 
  // Calculate total market equity available for trading
  var total_equity = (eth_market_cap / (2 * eth_price)) * (Math.pow((action_eth + (eth_market_cap / (2 * eth_price))), 0.5) - Math.pow((eth_market_cap / (2 * eth_price)), 0.5));
  
  // Calculate effective leverage based on the Uniswap pool value and the amount of ETH staked taking market action
  var effective_leverage = (total_equity / (action_eth * eth_price) );
  
  // Calculate expected ETH price change based on market action and the Uniswap AMM function
  var price_change = (total_equity * (1 - effective_leverage)) / (eth_market_cap + total_equity * effective_leverage);
  
  // Print results to console
  console.log("Initial ETH Market Cap: $" + eth_market_cap.toLocaleString());
  console.log("Staked ETH Taking Market Action: " + action_eth.toLocaleString());
  console.log("Total Market Equity Available for Trading: $" + total_equity.toLocaleString());
  console.log("Expected ETH Price Change: " + (price_change * 100).toFixed(2) + "%");
  
  // Return expected ETH price change to be used in Google Sheets
  return price_change;
}
