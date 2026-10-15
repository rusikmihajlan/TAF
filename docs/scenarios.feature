Feature: Practice Software Testing Application Verification

  # Area 1: Sign up / Sign in
  Scenario: User successfully signs in with valid credentials
    Given the user is on the login page of the website
    When the user enters a valid email address and password
    And the user clicks the login button
    Then the user should be redirected to their account overview page

  # Area 2: User profile
  Scenario: User updates their profile address details
    Given the user is logged into their account
    When the user navigates to the profile settings page
    And the user updates their street address and clicks save
    Then the profile page should display a success confirmation message

  # Area 3: Product details page
  Scenario: User views detailed information for a specific tool
    Given the user is on the main catalog page
    When the user clicks on the "Combination Pliers" product card
    And the product details page loads completely
    Then the page should display the product name, price, and description

  # Area 4: Basket
  Scenario: User adds a product to the shopping cart
    Given the user is viewing the details page of "Pliers"
    When the user selects a quantity of 2
    And the user clicks the "Add to Cart" button
    Then the shopping cart badge count should increase to 2

  # Area 5: Favorite products
  Scenario: User adds a product to their favorites list
    Given the user is logged in and browsing the item page
    When the user clicks the add to favorites icon on a product
    And the user opens their favorites page
    Then the selected product should appear in the favorites list

  # Area 6: Search for an exact product
  Scenario: User searches for a specific product by name
    Given the user is on the home page
    When the user enters "Hammer" into the search bar
    And the user clicks the search button
    Then the search results should display only items matching "Hammer"

  # Area 7: Filter and sort products
  Scenario: User sorts products by price from lowest to highest
    Given the user is on the main shop page displaying all items
    When the user selects "Price (Low - High)" from the sort dropdown menu
    And the product list refreshes
    Then the first displayed product should have the lowest price in the list

  # Area 8: Product categories
  Scenario: User filters products by specific category
    Given the user is viewing the main product catalog
    When the user selects the "Hand Tools" category filter
    And the catalog updates the visible items
    Then only products belonging to the "Hand Tools" category should be displayed
