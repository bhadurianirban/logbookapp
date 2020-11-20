export const MASTER_ELEMENTS_HEADERS = [
    {
        field: 'Name', header: 'Element Name', display: 'table-cell'
    },
    {
        field: 'Description', header: 'Description', display: 'table-cell'
    }
];

export const FTC_ELEMENTS_HEADERS = [
    {
        field: 'Name', header: 'Element Name', display: 'table-cell'
    },
    {
        field: 'Description', header: 'Description', display: 'table-cell'
    },
    {
        field: 'Owner', header: 'Owner', display: 'table-cell'
    },
    {
        field: 'RequestedDate', header: 'Requested On', display: 'table-cell'
    },
    {
        field: 'ChargeDate', header: 'Proposed Charging Date', display: 'table-cell'
    }
];

export const MASTER_CONSITTUENT_HEADERS = [
    {
        field: 'Name', header: 'Grid', display: 'table-cell'
    },
    {
        field: 'Region', header: 'Region', display: 'table-cell'
    },
    {
        field: 'MaxPeak', header: 'Max Peak Demand', display: 'table-cell'
    },
    {
        field: 'MaxOffPeak', header: 'Max Off Peak Demand', display: 'table-cell'

    }
];

export const MASTER_GRIDS_HEADERS = [
    {
        field: 'Name', header: 'Grid', display: 'table-cell'
    },
    {
        field: 'Region', header: 'Region', display: 'table-cell'
    },
    {
        field: 'MaxPeak', header: 'Max Load', display: 'table-cell'
    },
    {
        field: 'MaxOffPeak', header: 'Max Off Peak Demand', display: 'table-cell'

    },
    {
        field: 'PresentLoad', header: 'Present Load', display: 'table-cell'
    },
    {
        field: 'AllocatedLoad', header: 'Load Allocated', display: 'table-cell'
    },
    {
        field: 'Restriction', header: 'Restriction', display: 'table-cell'
    }
];

export const LOAD_CONSITTUENT_HEADERS = [
    {
        field: 'Name', header: 'Grid', display: 'table-cell'
    },
    {
        field: 'MaxPeakLoad', header: 'Max Peak Load', display: 'table-cell'
    },
    {
        field: 'MaxOffPeakLoad', header: 'Max Off Peak Demand', display: 'table-cell'

    },
    {
        field: 'PresentLoad', header: 'Present Load', display: 'table-cell'
    },
    {
        field: 'AllocatedLoad', header: 'Load Allocated', display: 'table-cell'
    }
];

export const LOAD_CONSITTUENT_GRID_HEADERS = [
    {
        field: 'Name', header: 'Grid', display: 'table-cell'
    },
    {
        field: 'MaxPeakLoad', header: 'Max Peak Load', display: 'table-cell'
    },
    {
        field: 'MaxOffPeak', header: 'Max Off Peak Demand', display: 'table-cell'

    },
    {
        field: 'PresentLoad', header: 'Present Load', display: 'table-cell'
    },
    {
        field: 'AllocatedLoad', header: 'Load Allocated', display: 'table-cell'
    },
    {
        field: 'Release', header: 'Release Load', display: 'table-cell'
    }
];

export const ALDC_LOAD_CONSITTUENT_HEADERS = [
    {
        field: 'GridName', header: 'Grid', display: 'table-cell'
    },
    {
        field: 'Code', header: 'Issued Code', display: 'table-cell'
    },
    {
        field: 'CreatedOn', header: 'Code Issued On', display: 'table-cell'
    },
    {
        field: 'MaxPeakLoad', header: 'Max Peak Load', display: 'table-cell'
    },
    {
        field: 'MaxOffPeak', header: 'Max Off Peak Demand', display: 'table-cell'

    },
    {
        field: 'PresentLoad', header: 'Present Load', display: 'table-cell'
    },
    {
        field: 'AllocatedLoad', header: 'Load Allocated', display: 'table-cell'
    }
];

export const ALDC_LOAD_CONSITTUENT_GRID_HEADERS = [
    {
        field: 'GridName', header: 'Grid', display: 'table-cell'
    },
    {
        field: 'Code', header: 'Issued Code', display: 'table-cell'
    },
    {
        field: 'CreatedOn', header: 'Code Issued On', display: 'table-cell'
    },
    {
        field: 'MaxPeakLoad', header: 'Max Peak Load', display: 'table-cell'
    },
    {
        field: 'MaxOffPeak', header: 'Max Off Peak Demand', display: 'table-cell'

    },
    {
        field: 'PresentLoad', header: 'Present Load', display: 'table-cell'
    },
    {
        field: 'AllocatedLoad', header: 'Load Allocated', display: 'table-cell'
    },
    {
        field: 'Release', header: 'Release Load', display: 'table-cell'
    }
];

export const OUTAGE_HEADERS = [
    {
        field: 'Gss', header: 'GSS Name', display: 'table-cell'
    },
    {
        field: 'Name', header: 'Element Name', display: 'table-cell'
    },
    {
        field: 'Description', header: 'Description', display: 'table-cell'
    },
    {
        field: 'LogDate', header: 'Outage Date', display: 'table-cell'
    },
    {
        field: 'LogTime', header: 'Outage Time', display: 'table-cell'
    },
    {
        field: 'reasonsViewOnly', header: 'Outage Reason', display: 'table-cell'
    },
    {
        field: 'ClearanceComment', header: 'Clearance Comments', display: 'table-cell'
    },
    {
        field: 'RestoreDate', header: 'Restored Date', display: 'table-cell'
    },
    {
        field: 'RestoreTime', header: 'Restored Time', display: 'table-cell'
    },
    {
        field: 'restoreRemarksViewOnly', header: 'Restored Remarks', display: 'table-cell'
    }
];

export const LOAD_DATA_HEADERS = [
    {
        field: 'Remarks', header: 'Remarks', display: 'table-cell'
    },
    {
        field: 'DisplayType', header: 'Type', display: 'table-cell'
    },
    {
        field: 'Grids', header: 'Grid with Restriction', display: 'table-cell'
    },
    {
        field: 'CreatedOn', header: 'Created On', display: 'table-cell'
    }
];

export const LOAD_DATA_GRIDS_HEADERS = [
    {
        field: 'Remarks', header: 'Remarks', display: 'table-cell'
    },
    {
        field: 'DisplayType', header: 'Type', display: 'table-cell'
    },
    {
        field: 'Grids', header: 'Grid with Release', display: 'table-cell'
    },
    {
        field: 'CreatedOn', header: 'Created On', display: 'table-cell'
    }
];

export const AUTO_RECLOSE_HEADERS = [
    {
        field: 'Name', header: 'Element Name', display: 'table-cell'
    },
    {
        field: 'Description', header: 'Description', display: 'table-cell'
    },
    {
        field: 'LogDate', header: 'Outage Date', display: 'table-cell'
    },
    {
        field: 'LogTime', header: 'Outage Time', display: 'table-cell'
    },
    {
        field: 'reasonsViewOnly', header: 'Outage Reason', display: 'table-cell'
    },
    {
        field: 'remarksViewOnly', header: 'Outage Remarks', display: 'table-cell'
    },
    {
        field: 'RestoreDate', header: 'Restored Date', display: 'table-cell'
    },
    {
        field: 'RestoreTime', header: 'Restored Time', display: 'table-cell'
    },
    {
        field: 'restoreRemarksViewOnly', header: 'Restored Remarks', display: 'table-cell'
    }
];

export const ANTITHEFT_HEADERS = [
    {
        field: 'Name', header: 'Element Name', display: 'table-cell'
    },
    {
        field: 'Description', header: 'Description', display: 'table-cell'
    },
    {
        field: 'LogDate', header: 'Outage Date', display: 'table-cell'
    },
    {
        field: 'LogTime', header: 'Outage Time', display: 'table-cell'
    },
    {
        field: 'reasonsViewOnly', header: 'Outage Reason', display: 'table-cell'
    },
    {
        field: 'remarksViewOnly', header: 'Outage Remarks', display: 'table-cell'
    },
    {
        field: 'RestoreDate', header: 'Restored Date', display: 'table-cell'
    },
    {
        field: 'RestoreTime', header: 'Restored Time', display: 'table-cell'
    },
    {
        field: 'restoreRemarksViewOnly', header: 'Restored Remarks', display: 'table-cell'
    }
];

export const TRIPPING_HEADERS = [
    {
        field: 'Gss', header: 'GSS Name', display: 'table-cell'
    },
    {
        field: 'Name', header: 'Element Name', display: 'table-cell'
    },
    {
        field: 'Description', header: 'Description', display: 'table-cell'
    },
    {
        field: 'TripDate', header: 'Tripping Date', display: 'table-cell'
    },
    {
        field: 'TripTime', header: 'Tripping Time', display: 'table-cell'
    },
    {
        field: 'EndRelayReasonOne', header: 'Reason', display: 'table-cell'
    },
    {
        field: 'ClearanceComment', header: 'Clearance Comment', display: 'table-cell'
    },
    {
        field: 'RevivalDate', header: 'Revival Date', display: 'table-cell'
    },
    {
        field: 'RevivalTime', header: 'Revival Time', display: 'table-cell'
    }
];

export const SHUTDOWN_HEADERS = [
    {
        field: 'GSSName', header: 'GSS Name', display: 'table-cell'
    },
    {
        field: 'ElementName', header: 'Name', display: 'table-cell'
    },
    {
        field: 'ElementDescription', header: 'Description', display: 'table-cell'
    },
    {
        field: 'Nature', header: 'Nature', display: 'table-cell'
    },
    {
        field: 'Type', header: 'Type', display: 'table-cell'
    },
    {
        field: 'PlannedOutage', header: 'Planned Outage', display: 'table-cell'
    },
    {
        field: 'PlannedRestore', header: 'Planned Restore', display: 'table-cell'
    },
    {
        field: 'ActualOutage', header: 'Actual Outage', display: 'table-cell'
    },
    {
        field: 'ActualRestore', header: 'Actual Restored', display: 'table-cell'
    }
];

export const LOGBOOK_DASHBOARD_HEADERS = [
    {
        field: 'LogbookDate', header: 'Date', display: 'table-cell'
    },
    {
        field: 'Shift', header: 'Shift', display: 'table-cell'
    },
    {
        field: 'Status', header: 'Status', display: 'table-cell'
    },
    {
        field: 'Frequency', header: 'Frequency', display: 'table-cell'
    },
    {
        field: 'DemandProfile', header: 'Demand Profile', display: 'table-cell'
    },
    {
        field: 'IssueCount', header: 'Issue Count', display: 'table-cell'
    },
    {
        field: 'OutageCount', header: 'Outage Count', display: 'table-cell'
    },
    {
        field: 'TrippingCount', header: 'Tripping Count', display: 'table-cell'
    },
    {
        field: 'MessageCount', header: 'Message Count', display: 'table-cell'
    },
    {
        field: 'ShutdownCount', header: 'Shutdown Count', display: 'table-cell'
    }
];

export const CONFIG_VALUES_HEADERS = [
    {
        field: 'Key', header: 'Config Key', display: 'table-cell'
    },
    {
        field: 'Value', header: 'Config Value', display: 'table-cell'
    }
];

export const VIOLATION_VALUES_HEADERS = [
    {
        field: 'ViolationType', header: 'Violation Value', display: 'table-cell'
    }
];

export const CONSTITUENT_VALUES_HEADERS = [
    {
        field: 'Name', header: 'Name', display: 'table-cell'
    },
    {
        field: 'Region', header: 'Region', display: 'table-cell'

    },
    {
        field: 'MaxPeak', header: 'Max Peak Demand', display: 'table-cell'

    },
    {
        field: 'MaxOffPeak', header: 'Max Off Peak Demand', display: 'table-cell'

    },
    {
        field: 'MobileNumber', header: 'Mobile No', display: 'table-cell'

    },
    {
        field: 'EmailId', header: 'Email Id', display: 'table-cell'

    }
];

export const CONSTITUENT_GRIDS_VALUES_HEADERS = [
    {
        field: 'Name', header: 'Name', display: 'table-cell'
    },
    {
        field: 'Region', header: 'Region', display: 'table-cell'

    },
    {
        field: 'MaxPeak', header: 'Max Peak Load', display: 'table-cell'

    },
    {
        field: 'MaxOffPeak', header: 'Max Off Peak Demand', display: 'table-cell'

    },
    {
        field: 'PresentLoad', header: 'Present Load', display: 'table-cell'

    },
    {
        field: 'AllocatedLoad', header: 'Load Allocated', display: 'table-cell'

    },
    {
        field: 'Restriction', header: 'Restriction', display: 'table-cell'

    }
];

export const ISSUE_VALUES_HEADERS = [
    {
        field: 'Issue', header: 'Issue ', display: 'table-cell'
    }
];

export const TRIPPING_VALUES_HEADERS = [
    {
        field: 'Name', header: 'Tripping Values ', display: 'table-cell'
    }
];
export const SCHEDULING_VALUES_HEADERS = [
    {
        field: 'SchedulingType', header: 'Scheduling Value', display: 'table-cell'
    }
];
export const DESIGNATION_VALUES_HEADERS = [
    {
        field: 'Designation', header: 'Designation', display: 'table-cell'
    },
    {
        field: 'Order', header: 'Order', display: 'table-cell'

    }
];

export const CODES_HEADER = [
    {
        field: 'Code', header: 'Code', display: 'table-cell'
    },
    {
        field: 'CodeType', header: 'Code Type', display: 'table-cell'
    },
    {
        field: 'ElementName', header: 'Code Created For', display: 'table-cell'
    },
    {
        field: 'Type', header: 'Element Type', display: 'table-cell'
    },
    {
        field: 'CreatedDateTimeStamp', header: 'Created On', display: 'table-cell'
    },
    {
        field: 'CodeCancelYesNo', header: 'Is Cancelled?', display: 'table-cell'
    },
    {
        field: 'CancelRemarks', header: 'Remarks(if cancelled)', display: 'table-cell'
    }
];

export const VIOLATION_REPORT_HEADER = [
    {
        field: 'ViolationType', header: 'Violation Type', display: 'table-cell'
    },
    {
        field: 'Constituent', header: 'Constituent', display: 'table-cell'
    },
    {
        field: 'SubViolationType', header: 'Sub Violation Type', display: 'table-cell'
    },
    {
        field: 'Message', header: 'Message', display: 'table-cell'
    },
    {
        field: 'CreatedDate', header: 'Created Date', display: 'table-cell'
    },
    {
        field: 'CreatedTime', header: 'Created Time', display: 'table-cell'
    }
];

export const ELEMENT_WISE_REPORT_HEADER = [
    {
        field: 'ElementName', header: 'Element', display: 'table-cell'
    },
    {
        field: 'OutageOrTripDate', header: 'Outage/Trip Date', display: 'table-cell'
    },
    {
        field: 'OutageOrTripTime', header: 'Outage/Trip Time', display: 'table-cell'
    },
    {
        field: 'RestoreOrReviveDate', header: 'Restore/Revival Date', display: 'table-cell'
    },
    {
        field: 'RestoreOrReviveTime', header: 'Restore/Revival Time', display: 'table-cell'
    },
    {
        field: 'ReasonIfAny', header: 'Reasons', display: 'table-cell'
    },
    {
        field: 'RemarksIfAny', header: 'Remarks', display: 'table-cell'
    },
    {
        field: 'EntryType', header: 'Entry Type', display: 'table-cell'
    }
];

export const FIRST_TIME_CHARGE_LINE_HEADERS = [
    {
        field: 'LineName', header: 'Line Name', display: 'table-cell'
    },
    {
        field: 'IsFirstTimeCharged', header: 'Is First Time Charged', display: 'table-cell'
    },
];
export const FIRST_TIME_CHARGE_HEADERS = [
    {
        field: 'Name', header: 'Line Name', display: 'table-cell'
    },
    {
        field: 'Description', header: 'Description', display: 'table-cell'
    },
    {
        field: 'RestoreDate', header: 'Charging Date', display: 'table-cell'
    },
    {
        field: 'RestoreTime', header: 'Charging Time', display: 'table-cell'
    },
    {
        field: 'restoreRemarksViewOnly', header: 'Charging Remarks', display: 'table-cell'
    }
];

export const TIE_LINES_HEADERS = [
    {
        field: 'TieLineName', header: 'Tie Line', display: 'table-cell'
    },
    {
        field: 'Time0', header: '00', display: 'table-cell'
    },
    {
        field: 'Time1', header: '01', display: 'table-cell'
    },
    {
        field: 'Time2', header: '02', display: 'table-cell'
    },
    {
        field: 'Time3', header: '03', display: 'table-cell'
    },
    {
        field: 'Time4', header: '04', display: 'table-cell'
    },
    {
        field: 'Time5', header: '05', display: 'table-cell'
    },
    {
        field: 'Time6', header: '06', display: 'table-cell'
    },
    {
        field: 'Time7', header: '07', display: 'table-cell'
    },
    {
        field: 'Time8', header: '08', display: 'table-cell'
    },
    {
        field: 'Time9', header: '09', display: 'table-cell'
    },
    {
        field: 'Time10', header: '10', display: 'table-cell'
    },
    {
        field: 'Time11', header: '11', display: 'table-cell'
    },
    {
        field: 'Time12', header: '12', display: 'table-cell'
    },
    {
        field: 'Time13', header: '13', display: 'table-cell'
    },
    {
        field: 'Time14', header: '14', display: 'table-cell'
    },
    {
        field: 'Time15', header: '15', display: 'table-cell'
    },
    {
        field: 'Time16', header: '16', display: 'table-cell'
    },
    {
        field: 'Time17', header: '17', display: 'table-cell'
    },
    {
        field: 'Time18', header: '18', display: 'table-cell'
    },
    {
        field: 'Time19', header: '19', display: 'table-cell'
    },
    {
        field: 'Time20', header: '20', display: 'table-cell'
    },
    {
        field: 'Time21', header: '21', display: 'table-cell'
    },
    {
        field: 'Time22', header: '22', display: 'table-cell'
    },
    {
        field: 'Time23', header: '23', display: 'table-cell'
    },
];


