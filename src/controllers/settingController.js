import { Setting } from "../models/index.js";

async function getSettingRecord() {
  const [setting] = await Setting.findOrCreate({
    where: { id: 1 },
    defaults: { studioName: "VicStudio" },
  });

  return setting;
}

const settingController = {
  get: async (req, res) => {
    try {
      const setting = await getSettingRecord();
      return res.json(setting);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const setting = await getSettingRecord();
      await setting.update(req.body);
      return res.json(setting);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default settingController;
