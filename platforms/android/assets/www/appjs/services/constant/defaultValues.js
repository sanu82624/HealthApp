'use strict';	

angular.module('cmaManagementApp')
    .constant('defaultValues', {
      
        SERVICE_URL: "http://healthappwsv0.mybluemix.net/",
        REQUEST_CHANNEL: "MOBILE",
        BLANK_STRING: "",
        COMBO_SELECT_MSG: "Please select",
        BLANK_ISD_CODE: "",
        ISD_SEPARATOR: "-|",
        COUNTRY_ENDED_LIST: "IN,US,GB",
        COUNTRY_SEARCH_FIELD: "isoCode",
        COUNTRY_SORT_FIELD: "name",
        PHONE_TYPE_DEFAULT: "Phone",
        MOBILE_TYPE_DEFAULT: "Mobile",
        RELOGIN_AGAIN: "\nRelogin again.",
        GENDER: "[{\"code\": \"M\",\"name\": \"Male\"},{\"code\": \"F\",\"name\": \"Female\"}]",
        ACTIVE: "Active",
        INACTIVE: "Inactive",
        BADGE_COLOR_ACTIVE: "green",
        BADGE_COLOR_INACTIVE: "red",
        SHOW_DATE_FORMAT: "DD-MMM-YYYY hh:mm A",
        ALERT_OFF_IN_SEC: 2,
        REQ_STATUSES:   "[{\"code\": \"ERROR\", \"color\": \"danger\"}," +
                        "{\"code\": \"DECLINED\", \"color\": \"warning\"}," +
                        "{\"code\": \"CLOSED\", \"color\": \"success\"}," +
                        "{\"code\": \"ACCEPTED\", \"color\": \"info\"}," +
                        "{\"code\": \"WIP\", \"color\": \"primary\"}]",
        VEND_TYPE_WITH_LOCATION: "AMB",
        CLOSED_TICKET_CONFIRM_MSG: "<p>Are you sure to <strong>#status#</strong> this ticket?<p>",
        CONFIRM_MODAL_POSITIVE_BTN_TEXT: "Yes",
        CONFIRM_MODAL_NEGITIVE_BTN_TEXT: "No",
        TCK_STATUSES: "[{\"code\": \"ASSIGNED\", \"color\": \"info\"}," +
                        "{\"code\": \"ACCEPTED\", \"color\": \"primary\"}," +
                        "{\"code\": \"DECLINED\", \"color\": \"danger\"}," +
                        "{\"code\": \"CLOSED\", \"color\": \"success\"}]",
        REMEMBER_TEXT: "Remember me",
        DOC_TYPES: ["Audiologist", "Allergist", "Andrologists", "Anesthesiologist",
                    "Cardiologist", "Cardiovascular Surgeon", "Clinical Neurophysiologist",
                    "Dentist", "Dermatologist", "Endocrinologist", "Epidemiologists",
                    "ENT Specialist", "Gastroenterologist", "Gynecologist",
                    "General Psychiatrist", "General Practitioners", "Hematologists‎",
                    "Hygienists‎", "Immunologist", "Infectious Disease Specialist",
                    "Internal Medicine Specialists", "Internists", "Medical Geneticist",
                    "Microbiologist", "Neonatologist", "Nephrologists", "Neurologist",
                    "Neurosurgeons", "Oncologist", "Ophthalmologist", "Orthopedic Surgeon",
                    "Orthopedist", "Primatologist", "Pale pathologist", "Parasitologist",
                    "Pathologists", "Pediatrician", "Plastic Surgeon", "Physiologists",
                    "Physiatrist", "Podiatrists", "Psychiatrists", "Pulmonologist",
                    "Radiologists", "Reproductive Endocrinologist", "Rheumatologist",
                    "Thoracic Oncologist", "Urologist"]
  });
