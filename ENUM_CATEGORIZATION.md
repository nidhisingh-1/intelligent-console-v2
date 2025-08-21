# QA Call Center Issue Categorization

This document outlines the comprehensive categorization of quality assurance issues for call center operations, specifically designed for automotive dealership call handling.

## Overview

The QA issues have been organized into **8 main categories** with **57 total enum codes**, each assigned appropriate severity levels based on their impact on customer experience and business operations.

## Categories

### 1. **CALL_FLOW_ISSUES** - Call Flow & Timing Issues
**Severity: HIGH** | **Count: 7 issues**

Critical issues that disrupt the basic flow and timing of conversations.

- `LONG_PAUSE` - Long/awkward pauses or random breaks
- `AGENT_LAG` - Lag in agent reply causing delays
- `CALL_COLLISION` - Agent & customer talk over each other
- `CUTS_CUSTOMER` - Agent cuts customer mid-speech
- `ABRUPT_END` - Call cut abruptly with no recovery
- `SILENCE_UNHANDLED` - Silence not handled (no checkback after 2-3s)
- `CALLBACK_FAILED` - Callback setup failed (customer left waiting)

### 2. **COMMUNICATION_STYLE** - Communication Style & Tone Issues
**Severity: MEDIUM** | **Count: 10 issues**

Problems with agent communication style, tone, and delivery that affect professionalism.

- `SPEAKS_SLOWLY` - Agent speaks too slowly
- `RUSHES_INFO` - Agent rushes info (too fast after search)
- `MONOLOGUE` - Agent dumps >3 sentences at once
- `ENDLESS_CONFIRM` - Endless confirmations / repeating same question
- `OVERLY_FRIENDLY` - Overly friendly (e.g., "Nice choice", "Good choice")
- `USES_SLANG` - Uses slang ("slick", "trendy")
- `OVERUSES_FILLER` - Overuses filler ("Good question" after everything)
- `SOUNDS_ROBOTIC` - Sounds robotic or unnatural
- `CARFAX_ROBOTIC` - Carfax explanation robotic/unhelpful
- `BACKGROUND_NOISE` - Background noise not handled

### 3. **DATA_ACCURACY** - Data Accuracy & Information Issues
**Severity: HIGH** | **Count: 11 issues**

Critical issues involving incorrect, missing, or inaccurate information provided to customers.

- `WRONG_COLOR` - Wrong car color informed
- `WRONG_STOCK_VIN` - Wrong/missing stock number or VIN
- `STOCK_CONFUSION` - Confusion between "a" and "8" in stock number
- `FABRICATES_INFO` - Agent fabricates inventory info
- `CARFAX_MISSING` - Carfax info missing or not explained
- `DEALER_LOC_EARLY` - Dealer location given too early
- `DEALER_ASSUMED` - Dealer details assumed incorrectly
- `MISSING_CONTEXT` - Current date/time context missing
- `ROUNDED_PRICING` - Agent provides rounded-off pricing
- `MILES_K_ERROR` - Agent uses "k" for miles incorrectly
- `OTD_MISSING` - Out-the-door price missing

### 4. **SEARCH_FUNCTIONALITY** - Search & Technical Issues
**Severity: HIGH** | **Count: 10 issues**

Technical problems with search functionality and data systems that prevent proper service.

- `INVENTORY_SEARCH_FAIL` - Inventory search failed (no data returned)
- `STOCK_SEARCH_FAIL` - Search by stock number not working
- `VIN_SEARCH_FAIL` - Search by VIN not working
- `CANT_NARROW_SEARCH` - Agent unable to narrow down search results
- `CRM_NOT_LINKED` - Dealer CRM not linked
- `SYNC_ISSUES` - Call log data sync issues
- `VIN_SOLUTIONS_FAIL` - VIN Solutions data not handled
- `PAST_CONVO_MISSING` - Past conversation data missing
- `FUZZY_SEARCH_MISSING` - Fuzzy stock search missing
- `NO_INVENTORY_DATA` - Agent doesn't have inventory data

### 5. **CUSTOMER_INFO** - Customer Information Management
**Severity: MEDIUM** | **Count: 6 issues**

Issues with collecting, managing, and confirming customer information.

- `NAME_NOT_ASKED` - Customer name not asked
- `PHONE_REDUNDANT` - Asking phone number even though customer already called
- `TIMEZONE_MISALIGN` - Call log time not aligned with dealer timezone
- `VIN_NOT_SHORTENED` - VIN not shortened (6 digits)
- `VIN_LETTER_CONFIRM` - VIN confirmed letter by letter (annoying)
- `EMAIL_LETTER_CONFIRM` - Email confirmed letter by letter (annoying)

### 6. **APPOINTMENT_BOOKING** - Appointment & Booking Issues
**Severity: HIGH** | **Count: 5 issues**

Critical problems with appointment scheduling and booking processes.

- `APPOINTMENT_NOT_BOOKED` - Appointment not booked when required
- `BOOKING_REPEATED` - Appointment booking repeated unnecessarily
- `OFF_DAY_BOOKING` - Appointment booked on dealership off-day
- `TEST_DRIVE_REPEATED` - Test drive appointment flow repeated
- `CAR_NOT_HELD` - Car not held correctly for test drive (or agent creates FOMO)

### 7. **PROCESS_ADHERENCE** - Process & Scope Issues
**Severity: MEDIUM** | **Count: 6 issues**

Deviations from proper processes and going off-scope from intended conversation flow.

- `TRADEIN_FLOW_MISSING` - Trade-in / pre-qualification flow missing
- `NO_HUMAN_TRANSFER` - Didn't transfer to human when requested
- `OFF_SCOPE_FINANCE` - Agent goes off-scope into finance
- `TOO_MUCH_FINANCE` - Agent provides too much finance info unprompted
- `CAR_INFO_OVERLOAD` - Car info overload (too much detail from inventory)
- `CAR_DETAILS_REPEATED` - Car make/model/year repeated too often

### 8. **FOLLOW_UP** - Follow-up & Communication Issues
**Severity: LOW** | **Count: 2 issues**

Missing follow-up communications and confirmations that affect customer experience.

- `NO_EMAIL_SUMMARY` - No email summary of call sent
- `NO_SMS_CONFIRM` - No SMS confirmation for appointments

## Severity Distribution

- **HIGH Severity**: 33 issues (58%) - Critical issues that directly impact customer experience or business outcomes
- **MEDIUM Severity**: 22 issues (39%) - Important issues that affect service quality but are not critical
- **LOW Severity**: 2 issues (3%) - Minor issues that are nice-to-have improvements

## Usage in QA Dashboard

These enums are now integrated into the QA Dashboard system and can be used for:

1. **Issue Tracking**: Mark specific issues during call reviews
2. **Analytics**: Generate reports on most common issue types
3. **Training**: Identify areas where agents need improvement
4. **Process Improvement**: Track resolution of systemic issues
5. **Performance Metrics**: Measure call quality across different categories

## Implementation Notes

- Each enum has a unique ID, code, title, and description
- All enums are active by default and can be toggled on/off
- The categorization follows a logical hierarchy from most critical (call flow) to least critical (follow-up)
- Codes follow a consistent naming pattern: `CATEGORY_PREFIX_###`
- The system supports filtering and searching across all categories

## Future Enhancements

- Add sub-categories for more granular classification
- Implement weighted scoring based on severity
- Add category-specific resolution workflows
- Create automated detection rules for common issues
