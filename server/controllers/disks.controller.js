
const childProcess = require('child_process');

module.exports.disks = async (req, res) => {
  try {
    const buffer = await childProcess.execSync('wmic logicaldisk get Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list').toString();
    res.status(200).json(buffer)
  } catch (error) {
    res.status(500).json(error)
  }
}