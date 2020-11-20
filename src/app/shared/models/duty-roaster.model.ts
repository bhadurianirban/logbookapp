export interface IDutyRoaster {
    Config: string[][];
    Groups: string[];
    comments: string;
}
export interface IDutyRoasterMonthData {
    Id: number;
    Month: string;
    Year: string;
    Group: string;
    Day1: string;
    Day2: string;
    Day3: string;
    Day4: string;
    Day5: string;
    Day6: string;
    Day7: string;
    Day8: string;
    Day9: string;
    Day10: string;
    Day11: string;
    Day12: string;
    Day13: string;
    Day14: string;
    Day15: string;
    Day16: string;
    Day17: string;
    Day18: string;
    Day19: string;
    Day20: string;
    Day21: string;
    Day22: string;
    Day23: string;
    Day24: string;
    Day25: string;
    Day26: string;
    Day27: string;
    Day28: string;
    Day29: string;
    Day30: string;
    Day31?: string;
}
export interface IDutyRoasterMonthDataViewModel {
    DutyRoasterMonthData: IDutyRoasterMonthData[];
    Comments: string[];
}
