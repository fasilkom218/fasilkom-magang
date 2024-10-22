"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MagangReguler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Mahasiswa, { foreignKey: "mhsId" });
    }
  }
  MagangReguler.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nama: DataTypes.STRING,
      npm: DataTypes.STRING,
      ttl: DataTypes.DATE,
      agama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      no_telpon: DataTypes.STRING,
      nama_perusahaan: DataTypes.STRING,
      penerima_surat: DataTypes.STRING,
      alamat_perusahaan: DataTypes.STRING,
      no_telpon_perusahaan: DataTypes.STRING,
      jenis_perusahaan: DataTypes.STRING,
      desc: DataTypes.TEXT,
      status: DataTypes.ENUM("waiting", "accepted", "rejected"),
      mhsId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MagangReguler",
    }
  );
  return MagangReguler;
};
