import { DataTypes } from "sequelize";
import { sequelize } from "./connection.js";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
  },
  { tableName: "users" }
);

const Link = sequelize.define(
  "Link",
  {
    url: {
      type: DataTypes.STRING({ length: 2048 }),
      allowNull: false,
      validate: { isUrl: true },
      unique: true,
    },

    title: {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: 'Unknown',
    },

    archived: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },

    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },

    favicon: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },

    last_visited: {
      type: DataTypes.DATE(),
      allowNull: true,
    },
  },
  {
    tableName: "links",
    timestamps: true,
  }
);

User.hasMany(Link, { as: "links", foreignKey: "userId" });
Link.belongsTo(User, {
  foreignKey: "userId",
});

export { User, Link };
