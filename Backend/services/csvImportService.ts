import axios from 'axios';

// Define types for the API response-those are the data I want to extract as they appear on the csv from gov.il(Hebrew-English attribute names)
interface VehicleRecord {
  mispar_rechev: string;
  tozeret_nm: string;
  kinuy_mishari: string;
  shnat_yitzur: string;
  tzeva_rechev: string;
  kvutzat_zihum: string;
  tokef_dt: string;
  ramat_gimur: string;
  mivchan_acharon_dt: string;
  sug_degem: string;
  degem_cd: string;
}

interface ApiResponse {
  success: boolean;
  result: {
    records: VehicleRecord[];
  };
}

export class VehicleService {
  // Function to fetch and search CSV data from data.gov.il
  async findCarInRemoteCSV(licensePlate: string): Promise<any> {
    try {
      const response = await axios.get<ApiResponse>(
        'https://data.gov.il/api/3/action/datastore_search',
        {
          params: {
            resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3',
            q: licensePlate,
            limit: 1
          }
        }
      );

      const data = response.data;

      if (data.success && data.result.records.length > 0) {
        const record = data.result.records[0];
        
        return {
          license_plate: record.mispar_rechev?.toString(),
          make: record.tozeret_nm,
          model: record.kinuy_mishari,
          year: parseInt(record.shnat_yitzur),
          color: record.tzeva_rechev,
          emission_group: record.kvutzat_zihum,
          valid_until: record.tokef_dt ? new Date(record.tokef_dt) : null,
          trim_level: record.ramat_gimur,
          last_test: record.mivchan_acharon_dt ? new Date(record.mivchan_acharon_dt) : null,
          model_type: record.sug_degem,
          model_number: record.degem_cd
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching data from data.gov.il:', error);
      throw error;
    }
  }
}