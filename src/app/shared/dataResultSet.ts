export class DataResultSet {

    /**
     * The Record Count
     */
    private recordCount: number;

    /**
     * The Results
     */
    private results: any[];

    /**
     * Default Constructor
     * @param recordCount the Record Count
     * @param results the Results
     */
    constructor(recordCount: number, results: any[]) {
        this.recordCount = recordCount;
        this.results = results;
    }

    /**
     * Get the Record Count
     */
    public getRecordCount(): number {
        return this.recordCount;
    }

    /**
     * Get the Results
     */
    public getResults(): any[] {
        return this.results;
    }

}
