import { log } from "../../DB/model/log.js";


export const createLog = async(req,res,next) => {
  const log = await log.create(req.body)

  if(!log){
    res.status(400).json({message: "Error cant add new log "})
  }

  res.status(201).json({message:"Done"})
}


export const getAllLogs =  async (req, res) => {
 try {
  const { page = 1, limit = 10, userId } = req.query;
  const filter = userId ? { userId } : {};
  
  const logs = await log.find(filter)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

    if(!logs) return res.status(404).json({ message: "No logs found" });

    res.status(201).json({message: "Logs fetched successfully 🏳 ", logs});
 } catch (error) {
    
 }
};