export interface LogbookSystemReportNet {
    Id: number;
    LogbookId: string;
    central_sector_bilateral_energy: number;
    NR_CS_power_exchange: number;
    central_sector_bilateral_power: number;
    total_demand_met_energy: number;
    total_demand_met_NBPDCL_energy: number;
    total_demand_met_SBPDCL: number;
    ERLDC_Schedule_energy: number;
    energy_ui_energy: number;
    average_frequency: number;
}
