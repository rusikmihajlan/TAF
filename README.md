# Module 07 — Test Automation Framework

A standalone JavaScript/WebdriverIO framework for the eight original Practice Software Testing UI scenarios. The framework uses Mocha, Chai and Page Objects. It refactors the previous browser automation into three layers, with independent tests and condition-based waits.

## Requirements and installation

- Node.js 24 LTS (Node 22+ is supported by the dependencies), npm and Internet access.
- Chrome or Chromium and its OS dependencies. WebdriverIO can download Chrome for Testing and a matching driver automatically. A local installation can be selected with `CHROME_BIN`.
- Access to `practicesoftwaretesting.com`, `api.practicesoftwaretesting.com`, the npm registry, `googlechromelabs.github.io` and `storage.googleapis.com`.

```sh
npm ci
npm run check
npm test
```

`package-lock.json` pins the dependency graph. No other repository, private account, manually created test data or local application server is required. `node_modules` and test artifacts are ignored by Git.

## Running tests

The default command runs all eight scenarios serially in headless Chrome. Each spec file contains one scenario and receives a new browser session. Each authenticated scenario registers its own customer through the UI using a unique email, so there is no shared account, cart, favorites list or execution-order dependency.

```sh
# One independently runnable scenario
npm test -- --spec ../specs/02-profile.spec.js

# Reverse the file order (POSIX shell)
TEST_ORDER=reverse npm test

# Use the installed Chromium (POSIX shell)
CHROME_BIN=/usr/bin/chromium npm test

# Visible browser, when a graphical desktop is available
HEADLESS=false npm test
```

`--spec` paths are relative to `tests/config/wdio.conf.js`; the example selects exactly one test.

In PowerShell, set a variable before running, for example `$env:HEADLESS = 'false'; npm test`.

| Variable | Default | Purpose |
| --- | --- | --- |
| `BASE_URL` | `https://practicesoftwaretesting.com` | Application origin |
| `HEADLESS` | enabled | Set to `false` for a visible browser |
| `CHROME_BIN` | WebdriverIO discovery/download | Optional browser executable |
| `CHROMEDRIVER_BIN` | WebdriverIO download | Optional compatible driver executable |
| `BROWSER_PROXY` | none | Optional browser proxy URL |
| `TEST_ORDER` | ascending | Set to `reverse` to verify order independence |

Behind a corporate/cloud HTTPS proxy, configure the supported Node and browser trust stores with the trusted proxy CA. TLS checks remain enabled. In this cloud environment Chromium needs access to its NSS trust database; run with the environment's approved browser permissions. To use its proxy, run `CHROME_BIN=/usr/bin/chromium BROWSER_PROXY="$HTTPS_PROXY" npm test`. No proxy address or credentials are stored in the repository.

Screenshots of failures are saved to ignored `artifacts/`. Tests are not retried automatically. Generated demo customers remain on the public demo service until that service resets its data; the UI has no account deletion flow. Tests never modify the shared demo customer's profile.

## Architecture

```text
Tests + configuration + fixtures
           |
           v
Business workflows / Page Objects / page components
           |
           v
Core browser mechanics (BasePage)
           |
           v
WebdriverIO -> browser -> application
```

- **Core:** `BasePage` receives the browser through its constructor and implements navigation, visibility waits, click, fill and text reading. It contains no application routes, selectors or business data.
- **Business:** page classes own selectors and application actions. `Header` encapsulates the shared cart badge. `CustomerFlow` composes registration and login for reusable authenticated setup. Pages inherit browser mechanics from `BasePage`; objects are created per test, not shared as mutable singletons.
- **Tests:** specs arrange their own prerequisites, call only business objects, and assert outcomes with Chai. Configuration and generated customer data also live here. Tests do not use `fetch`, raw selectors, UI commands or application endpoints directly.

DRY: shared mechanics and authentication flow are defined once. KISS: ordinary classes and eight focused specs. YAGNI: no unused API client, DI container, reporting service or unrelated sample login application. Synchronization uses element readiness, application completion markers, navigation and changed pagination contents; there are no fixed sleeps.

## Scenario coverage

The original Given/When/Then text is preserved in `docs/scenarios.feature` for traceability. It is documentation; the executable implementation is Mocha, not Cucumber.

| Area | Spec | Verified outcome |
| --- | --- | --- |
| 1. Sign in | `01-login.spec.js` | Valid credentials lead to `/account` and the My account heading |
| 2. Profile | `02-profile.spec.js` | Successful update confirmation and street persisted after reopening |
| 3. Product | `03-product.spec.js` | Combination Pliers name, positive numeric price and nonempty description |
| 4. Basket | `04-basket.spec.js` | Adding exactly two Pliers gives a badge count of 2 |
| 5. Favorites | `05-favorites.spec.js` | The exact selected product appears in the new customer's favorites |
| 6. Search | `06-search.spec.js` | Every result on every result page matches Hammer |
| 7. Sorting | `07-sort.spec.js` | All result pages are in ascending price order, with the minimum first |
| 8. Categories | `08-category.spec.js` | Every filtered product's detail category belongs to Hand Tools or its UI-defined children |

Hand Tools is a parent category: individual products display child categories such as Pliers and Hammer. The category test collects the allowed descendants from the filter tree, traverses every filtered page and checks each product's category on its detail page. It does not merely assert that some cards exist.

## Project structure

```text
TAF/
├── .gitignore
├── .nvmrc
├── README.md
├── eslint.config.js
├── package.json
├── package-lock.json
├── docs/
│   └── scenarios.feature
├── src/
│   ├── core/
│   │   └── BasePage.js
│   └── business/
│       ├── components/
│       │   └── Header.js
│       ├── flows/
│       │   └── CustomerFlow.js
│       └── pages/
│           ├── AccountPage.js
│           ├── CatalogPage.js
│           ├── FavoritesPage.js
│           ├── LoginPage.js
│           ├── ProductPage.js
│           ├── ProfilePage.js
│           └── RegistrationPage.js
└── tests/
    ├── config/
    │   └── wdio.conf.js
    ├── fixtures/
    │   └── customer.js
    └── specs/
        ├── 01-login.spec.js
        ├── 02-profile.spec.js
        ├── 03-product.spec.js
        ├── 04-basket.spec.js
        ├── 05-favorites.spec.js
        ├── 06-search.spec.js
        ├── 07-sort.spec.js
        └── 08-category.spec.js
```

## Validation

Validated on 2026-10-15 using Node.js 24.19.0 and Chromium 154.0.8037.57 on Linux:

- `npm ci`: successful installation from the lockfile.
- `npm run check`: ESLint passed.
- `git diff --check`: passed.
- Scenarios 1–5 passed together after corrections; scenarios 6–8 passed in the initial run.
- Full final run with `TEST_ORDER=reverse`: **8 passed, 0 failed, 0 skipped**, in 1 minute 22 seconds, with retries disabled.

The browser runs used `CHROME_BIN=/usr/bin/chromium` and the environment proxy/trusted CA described above. Windows, Edge and other browsers were not tested. The public demo application and its data can change independently of this repository.
