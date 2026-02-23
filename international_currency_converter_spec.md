# International Currency Converter Web Application

## Product Overview

A calculator-first international currency converter that allows users
to:

-   Enter an amount using a calculator-style keypad
-   Select a base currency to convert from
-   View conversions into multiple target currencies
-   Switch between predefined country/currency tabs
-   View real-time (or cached) exchange rates

The UI should feel fast, intuitive, and mobile-friendly. Built using
React or Streamlit.

------------------------------------------------------------------------

# Functional Requirements

## 1. Amount Entry (Calculator Style)

-   Numeric keypad: `0-9`, `.`, `⌫` (Backspace), `C` (Clear)
-   Prevent invalid numbers:
    -   Only one decimal point
    -   Optional: limit to 2 decimal places
-   Optional keyboard support (digits, backspace, period)

------------------------------------------------------------------------

## 2. Supported Currencies (Minimum)

At least 5 currencies supported. Example set:

-   USD (United States)
-   MXN (Mexico)
-   COP (Colombia)
-   GBP (United Kingdom)
-   VND (Vietnam)
-   THB (Thailand)
-   MYR (Malaysia)

------------------------------------------------------------------------

## 3. Base Currency Selection

-   User must select a base currency (default: USD)
-   Base currency selectable via dropdown
-   If base exists in active tab, exclude it from target results
    automatically

------------------------------------------------------------------------

## 4. Conversion Output

-   Always display at least two converted currencies
-   Recommended: show all other currencies in the active tab except base
-   Display:
    -   Converted amount
    -   Currency code
    -   Exchange rate used (e.g., 1 USD = 17.25 MXN)

------------------------------------------------------------------------

## 5. Conversion Tabs

### Tab 1: Americas

Currencies: - USD - MXN - COP

### Tab 2: SEA + UK

Currencies: - USD - GBP - VND - THB - MYR

Each tab defines: - Display order - Supported currencies - Optional
default base currency

------------------------------------------------------------------------

## 6. Exchange Rate Source

### Option A: Live API (Recommended)

-   Fetch from exchange-rate API
-   Cache rates for 10--60 minutes
-   Display "Last Updated" timestamp
-   Graceful fallback to cached rates if API fails

### Option B: Static Rates

-   Hardcoded rates for offline/demo mode
-   Manual updates

------------------------------------------------------------------------

## 7. Conversion Formula

If rates are anchored to a common currency (e.g., USD):

    amount_target = amount_base × (rate_target / rate_base)

Display formatting: - Most fiat: 2 decimal places - Optional special
formatting for currencies like VND

------------------------------------------------------------------------

# Non-Functional Requirements

## Performance

-   Conversions should feel instant (\<50ms after rates load)
-   Do not refetch rates on every keystroke
-   Cache in memory + local storage (React) or session_state (Streamlit)

## Reliability

-   If API fails:
    -   Show banner: "Using cached rates"
    -   Continue conversions

## Usability

-   Mobile-first layout
-   Large readable amount display
-   Tab switching does NOT reset entered amount

## Security

-   Do not expose API keys in frontend
-   Use backend proxy if required

## Accessibility

-   Clear button labels
-   Keyboard navigation support

------------------------------------------------------------------------

# UI Design Blueprint

## Layout Structure

Top Bar: - App title - Last updated timestamp

Tabs Row: - Americas - SEA + UK

Amount Section: - Large amount display - Base currency dropdown

Results Section: - Card per target currency - Converted amount (large) -
Currency code - Exchange rate used

Keypad Section: - 3x4 numeric grid - Clear + Backspace

------------------------------------------------------------------------

# Shared Data Model

## TabSet

    {
      id: string,
      name: string,
      currencies: string[],
      defaultBase: string
    }

## Rates

    {
      asOf: timestamp,
      baseAnchor: string,
      values: {
        [currencyCode]: number
      }
    }

------------------------------------------------------------------------

# React Implementation Plan

## Recommended Stack

-   React + TypeScript + Vite
-   TanStack Query (React Query) for caching
-   Optional backend proxy for exchange API

## Component Structure

App - TabSelector - AmountDisplay - BaseCurrencySelect -
ConversionResults - Keypad

## Core State

-   activeTabId
-   amountString
-   baseCurrency
-   rates

## Behavior

-   Persist amount when switching tabs
-   Recalculate on:
    -   Amount change
    -   Base currency change
    -   Tab change

------------------------------------------------------------------------

# Streamlit Implementation Plan

## Structure

-   st.tabs(\[...\])
-   st.text_input or custom keypad buttons
-   st.session_state for persistence
-   st.cache_data(ttl=...) for rate caching

## Display

-   st.metric or st.columns for conversion cards
-   Banner if using cached rates

------------------------------------------------------------------------

# MVP Scope

1.  Static tab sets
2.  Calculator keypad
3.  Base currency selector
4.  Live rate fetch with caching
5.  Conversion results per active tab
6.  Last updated indicator

------------------------------------------------------------------------

# Acceptance Criteria

-   User can enter 123.45 correctly via keypad
-   Switching tabs preserves amount
-   Selecting USD shows at least two conversions
-   If API fails, cached rates are used
-   Conversions update instantly without refetching
