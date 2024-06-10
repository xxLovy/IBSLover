import { DAILY_LIMIT, keywords } from "../constants";
import Usage from "../database/models/usage.model";

export async function checkAPIKeyLimit() {
    try {
        const today = new Date().toISOString().split('T')[0];
        let existingRecord = await Usage.findOne({ date: today });

        if (existingRecord) {
            existingRecord.count += keywords.length;
            if (existingRecord.count > DAILY_LIMIT) {
                console.log(`day:${today}, used:${existingRecord.count}, limit:${DAILY_LIMIT}`);
                return false;
            }
            await existingRecord.save();
        } else {
            await Usage.create({ date: today, count: keywords.length });
        }
        console.log(`day:${today}, used:${existingRecord.count}, limit:${DAILY_LIMIT}`);
        return true;
    } catch (error) {
        console.error("Error while checking API key limit:", error);
        return false;
    }
}
