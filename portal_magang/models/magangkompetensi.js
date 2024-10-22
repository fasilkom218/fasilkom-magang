"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MagangKompetensi extends Model {
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
  MagangKompetensi.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nama: DataTypes.STRING,
      npm: DataTypes.STRING,
      anggota: DataTypes.STRING,
      nama_kompetisi: DataTypes.STRING,
      tingkat_kompetisi: DataTypes.STRING,
      tanggal_kompetisi: DataTypes.STRING,
      linkWeb: DataTypes.STRING,
      bidang_minat: DataTypes.ENUM("software", "network", "data"),
      status: DataTypes.ENUM("waiting", "accepted", "rejected"),
      mhsId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MagangKompetensi",
    }
  );
  return MagangKompetensi;
};
