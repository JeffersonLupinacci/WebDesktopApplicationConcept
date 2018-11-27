import { DataResultSet } from './dataResultSet';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

export interface IService {

    userSelectedColumns: any[];

    /**
     * Get the Results
     * @param first the First Param
     * @param rows the Number of Rows
     */
    getResults(event: LazyLoadEvent): Promise<DataResultSet>;

    /**
     * Get the Active Columns
     */
    getColumns(): any;

    /**
     * Get the User Selected Columns
     */
    getUserSelectedColumns();

    /**
     * Set the User Selected Columns
     * @param userSelectedColumns the userSelectedColumns to Set
     */
    setUserSelectedColumns(userSelectedColumns: any);

    /**
     * Remove a Entity
     * @param entity the entity to romove
     */
    delete(entity: any);

    /**
     * Export to Csv
     */
    exportToCsv();

    /**
     * Export To Html
     */
    exportToHtml();

    /**
     * Export to Txt
     */
    exportToTxt();

}
