import type { QAEnum } from "./types"

// Comprehensive QA Enum Categories for Call Center Operations
export const COMPREHENSIVE_ENUMS: QAEnum[] = [
  // ===== CALL FLOW & TIMING ISSUES (HIGH SEVERITY) =====
  {
    id: "enum-cf-001",
    code: "LONG_PAUSE",
    title: "Long/Awkward Pauses",
    description: "Long/awkward pauses or random breaks during conversation",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cf-002",
    code: "AGENT_LAG",
    title: "Agent Reply Lag",
    description: "Lag in agent reply causing conversation delays",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cf-003",
    code: "CALL_COLLISION",
    title: "Call Collision",
    description: "Agent & customer talk over each other",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cf-004",
    code: "CUTS_CUSTOMER",
    title: "Agent Cuts Customer",
    description: "Agent cuts customer mid-speech",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cf-005",
    code: "ABRUPT_END",
    title: "Abrupt Call End",
    description: "Call cut abruptly with no recovery",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cf-006",
    code: "SILENCE_UNHANDLED",
    title: "Silence Not Handled",
    description: "Silence not handled (no checkback after 2-3s)",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cf-007",
    code: "CALLBACK_FAILED",
    title: "Callback Setup Failed",
    description: "Callback setup failed (customer left waiting)",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },

  // ===== COMMUNICATION STYLE & TONE ISSUES (MEDIUM SEVERITY) =====
  {
    id: "enum-cs-001",
    code: "SPEAKS_SLOWLY",
    title: "Agent Speaks Too Slowly",
    description: "Agent speaks too slowly affecting conversation flow",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-002",
    code: "RUSHES_INFO",
    title: "Agent Rushes Information",
    description: "Agent rushes info (too fast after search)",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-003",
    code: "MONOLOGUE",
    title: "Agent Monologue",
    description: "Agent dumps >3 sentences at once (monologue)",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-004",
    code: "ENDLESS_CONFIRM",
    title: "Endless Confirmations",
    description: "Endless confirmations / repeating same question",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-005",
    code: "OVERLY_FRIENDLY",
    title: "Overly Friendly Tone",
    description: "Overly friendly (e.g., 'Nice choice', 'Good choice')",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-006",
    code: "USES_SLANG",
    title: "Uses Inappropriate Slang",
    description: "Uses slang ('slick', 'trendy')",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-007",
    code: "OVERUSES_FILLER",
    title: "Overuses Filler Words",
    description: "Overuses filler ('Good question' after everything)",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-008",
    code: "SOUNDS_ROBOTIC",
    title: "Sounds Robotic",
    description: "Sounds robotic or unnatural in speech pattern",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-009",
    code: "CARFAX_ROBOTIC",
    title: "Carfax Explanation Robotic",
    description: "Carfax explanation robotic/unhelpful",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-cs-010",
    code: "BACKGROUND_NOISE",
    title: "Background Noise Not Handled",
    description: "Background noise not handled properly",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },

  // ===== DATA ACCURACY & INFORMATION ISSUES (HIGH SEVERITY) =====
  {
    id: "enum-da-001",
    code: "WRONG_COLOR",
    title: "Wrong Car Color",
    description: "Wrong car color informed to customer",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-002",
    code: "WRONG_STOCK_VIN",
    title: "Wrong/Missing Stock/VIN",
    description: "Wrong/missing stock number or VIN provided",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-003",
    code: "STOCK_CONFUSION",
    title: "Stock Number Confusion",
    description: "Confusion between 'a' and '8' in stock number",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-004",
    code: "FABRICATES_INFO",
    title: "Agent Fabricates Info",
    description: "Agent fabricates inventory information",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-005",
    code: "CARFAX_MISSING",
    title: "Carfax Info Missing",
    description: "Carfax info missing or not explained",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-006",
    code: "DEALER_LOC_EARLY",
    title: "Dealer Location Given Early",
    description: "Dealer location given too early in conversation",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-007",
    code: "DEALER_ASSUMED",
    title: "Dealer Details Assumed",
    description: "Dealer details assumed incorrectly",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-008",
    code: "MISSING_CONTEXT",
    title: "Missing Date/Time Context",
    description: "Current date/time context missing",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-009",
    code: "ROUNDED_PRICING",
    title: "Rounded-off Pricing",
    description: "Agent provides rounded-off pricing",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-010",
    code: "MILES_K_ERROR",
    title: "Incorrect Miles 'K' Usage",
    description: "Agent uses 'k' for miles incorrectly",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-da-011",
    code: "OTD_MISSING",
    title: "Out-the-door Price Missing",
    description: "Out-the-door price missing",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },

  // ===== SEARCH & TECHNICAL ISSUES (HIGH SEVERITY) =====
  {
    id: "enum-st-001",
    code: "INVENTORY_SEARCH_FAIL",
    title: "Inventory Search Failed",
    description: "Inventory search failed (no data returned)",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-002",
    code: "STOCK_SEARCH_FAIL",
    title: "Stock Search Not Working",
    description: "Search by stock number not working",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-003",
    code: "VIN_SEARCH_FAIL",
    title: "VIN Search Not Working",
    description: "Search by VIN not working",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-004",
    code: "CANT_NARROW_SEARCH",
    title: "Cannot Narrow Search Results",
    description: "Agent unable to narrow down search results",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-005",
    code: "CRM_NOT_LINKED",
    title: "Dealer CRM Not Linked",
    description: "Dealer CRM not linked properly",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-006",
    code: "SYNC_ISSUES",
    title: "Call Log Data Sync Issues",
    description: "Call log data sync issues",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-007",
    code: "VIN_SOLUTIONS_FAIL",
    title: "VIN Solutions Data Not Handled",
    description: "VIN Solutions data not handled properly",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-008",
    code: "PAST_CONVO_MISSING",
    title: "Past Conversation Data Missing",
    description: "Past conversation data missing",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-009",
    code: "FUZZY_SEARCH_MISSING",
    title: "Fuzzy Stock Search Missing",
    description: "Fuzzy stock search missing",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-st-010",
    code: "NO_INVENTORY_DATA",
    title: "Agent No Inventory Data",
    description: "Agent doesn't have inventory data",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },

  // ===== CUSTOMER INFORMATION MANAGEMENT (MEDIUM SEVERITY) =====
  {
    id: "enum-ci-001",
    code: "NAME_NOT_ASKED",
    title: "Customer Name Not Asked",
    description: "Customer name not asked during call",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ci-002",
    code: "PHONE_REDUNDANT",
    title: "Redundant Phone Number Request",
    description: "Asking phone number even though customer already called",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ci-003",
    code: "TIMEZONE_MISALIGN",
    title: "Call Log Timezone Misalignment",
    description: "Call log time not aligned with dealer timezone",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ci-004",
    code: "VIN_NOT_SHORTENED",
    title: "VIN Not Shortened",
    description: "VIN not shortened (6 digits)",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ci-005",
    code: "VIN_LETTER_CONFIRM",
    title: "VIN Letter-by-Letter Confirmation",
    description: "VIN confirmed letter by letter (annoying)",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ci-006",
    code: "EMAIL_LETTER_CONFIRM",
    title: "Email Letter-by-Letter Confirmation",
    description: "Email confirmed letter by letter (annoying)",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },

  // ===== APPOINTMENT & BOOKING ISSUES (HIGH SEVERITY) =====
  {
    id: "enum-ab-001",
    code: "APPOINTMENT_NOT_BOOKED",
    title: "Appointment Not Booked",
    description: "Appointment not booked when required",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ab-002",
    code: "BOOKING_REPEATED",
    title: "Appointment Booking Repeated",
    description: "Appointment booking repeated unnecessarily",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ab-003",
    code: "OFF_DAY_BOOKING",
    title: "Off-Day Appointment Booking",
    description: "Appointment booked on dealership off-day",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ab-004",
    code: "TEST_DRIVE_REPEATED",
    title: "Test Drive Appointment Repeated",
    description: "Test drive appointment flow repeated",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ab-005",
    code: "CAR_NOT_HELD",
    title: "Car Not Held for Test Drive",
    description: "Car not held correctly for test drive (or agent creates FOMO)",
    severity: "HIGH",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },

  // ===== PROCESS & SCOPE ISSUES (MEDIUM SEVERITY) =====
  {
    id: "enum-ps-001",
    code: "TRADEIN_FLOW_MISSING",
    title: "Trade-in Flow Missing",
    description: "Trade-in / pre-qualification flow missing",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ps-002",
    code: "NO_HUMAN_TRANSFER",
    title: "No Human Transfer",
    description: "Didn't transfer to human when requested",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ps-003",
    code: "OFF_SCOPE_FINANCE",
    title: "Off-Scope Finance Discussion",
    description: "Agent goes off-scope into finance",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ps-004",
    code: "TOO_MUCH_FINANCE",
    title: "Too Much Finance Info",
    description: "Agent provides too much finance info unprompted",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ps-005",
    code: "CAR_INFO_OVERLOAD",
    title: "Car Info Overload",
    description: "Car info overload (too much detail from inventory)",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-ps-006",
    code: "CAR_DETAILS_REPEATED",
    title: "Car Details Repeated Too Often",
    description: "Car make/model/year repeated too often",
    severity: "MEDIUM",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },

  // ===== FOLLOW-UP & COMMUNICATION ISSUES (LOW SEVERITY) =====
  {
    id: "enum-fc-001",
    code: "NO_EMAIL_SUMMARY",
    title: "No Email Summary",
    description: "No email summary of call sent",
    severity: "LOW",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "enum-fc-002",
    code: "NO_SMS_CONFIRM",
    title: "No SMS Confirmation",
    description: "No SMS confirmation for appointments",
    severity: "LOW",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
]

// Category summary for reference
export const ENUM_CATEGORIES = {
  CALL_FLOW_ISSUES: {
    name: "Call Flow & Timing Issues",
    description: "Issues related to call timing, flow, and basic conversation management",
    severity: "HIGH",
    count: 7,
    codes: ["LONG_PAUSE", "AGENT_LAG", "CALL_COLLISION", "CUTS_CUSTOMER", "ABRUPT_END", "SILENCE_UNHANDLED", "CALLBACK_FAILED"]
  },
  COMMUNICATION_STYLE: {
    name: "Communication Style & Tone Issues", 
    description: "Problems with agent communication style, tone, and delivery",
    severity: "MEDIUM",
    count: 10,
    codes: ["SPEAKS_SLOWLY", "RUSHES_INFO", "MONOLOGUE", "ENDLESS_CONFIRM", "OVERLY_FRIENDLY", "USES_SLANG", "OVERUSES_FILLER", "SOUNDS_ROBOTIC", "CARFAX_ROBOTIC", "BACKGROUND_NOISE"]
  },
  DATA_ACCURACY: {
    name: "Data Accuracy & Information Issues",
    description: "Incorrect, missing, or inaccurate information provided to customers",
    severity: "HIGH", 
    count: 11,
    codes: ["WRONG_COLOR", "WRONG_STOCK_VIN", "STOCK_CONFUSION", "FABRICATES_INFO", "CARFAX_MISSING", "DEALER_LOC_EARLY", "DEALER_ASSUMED", "MISSING_CONTEXT", "ROUNDED_PRICING", "MILES_K_ERROR", "OTD_MISSING"]
  },
  SEARCH_FUNCTIONALITY: {
    name: "Search & Technical Issues",
    description: "Technical problems with search functionality and data systems",
    severity: "HIGH",
    count: 10,
    codes: ["INVENTORY_SEARCH_FAIL", "STOCK_SEARCH_FAIL", "VIN_SEARCH_FAIL", "CANT_NARROW_SEARCH", "CRM_NOT_LINKED", "SYNC_ISSUES", "VIN_SOLUTIONS_FAIL", "PAST_CONVO_MISSING", "FUZZY_SEARCH_MISSING", "NO_INVENTORY_DATA"]
  },
  CUSTOMER_INFO: {
    name: "Customer Information Management",
    description: "Issues with collecting, managing, and confirming customer information",
    severity: "MEDIUM",
    count: 6,
    codes: ["NAME_NOT_ASKED", "PHONE_REDUNDANT", "TIMEZONE_MISALIGN", "VIN_NOT_SHORTENED", "VIN_LETTER_CONFIRM", "EMAIL_LETTER_CONFIRM"]
  },
  APPOINTMENT_BOOKING: {
    name: "Appointment & Booking Issues", 
    description: "Problems with appointment scheduling and booking processes",
    severity: "HIGH",
    count: 5,
    codes: ["APPOINTMENT_NOT_BOOKED", "BOOKING_REPEATED", "OFF_DAY_BOOKING", "TEST_DRIVE_REPEATED", "CAR_NOT_HELD"]
  },
  PROCESS_ADHERENCE: {
    name: "Process & Scope Issues",
    description: "Deviations from proper processes and going off-scope",
    severity: "MEDIUM", 
    count: 6,
    codes: ["TRADEIN_FLOW_MISSING", "NO_HUMAN_TRANSFER", "OFF_SCOPE_FINANCE", "TOO_MUCH_FINANCE", "CAR_INFO_OVERLOAD", "CAR_DETAILS_REPEATED"]
  },
  FOLLOW_UP: {
    name: "Follow-up & Communication Issues",
    description: "Missing follow-up communications and confirmations",
    severity: "LOW",
    count: 2,
    codes: ["NO_EMAIL_SUMMARY", "NO_SMS_CONFIRM"]
  }
}
