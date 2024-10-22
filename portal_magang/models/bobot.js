"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bobot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Nilai, { foreignKey: "nilaiId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Mahasiswa, { foreignKey: "mhsId" });
    }
  }
  Bobot.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      disiplin: DataTypes.FLOAT,
      sikap: DataTypes.FLOAT,
      tanggung_jawab: DataTypes.FLOAT,
      kehadiran: DataTypes.FLOAT,
      tata_tertib: DataTypes.FLOAT,
      penampilan: DataTypes.FLOAT,
      kemampuan_kerja: DataTypes.FLOAT,
      keterampilan_kerja: DataTypes.FLOAT,
      kualitas_kerja: DataTypes.FLOAT,
      kemampuan_berkomunikasi: DataTypes.FLOAT,
      kerjasama: DataTypes.FLOAT,
      kerajinan: DataTypes.FLOAT,
      percaya_diri: DataTypes.FLOAT,
      relevansi: DataTypes.FLOAT,
      isi_laporan: DataTypes.FLOAT,
      total: DataTypes.FLOAT,
      nilaiId: DataTypes.STRING,
      mhsId: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bobot",
    }
  );
  return Bobot;
};
