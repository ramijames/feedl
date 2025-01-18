import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Feed = sequelize.define('Feed', {
  /* 
    Title
    Link
    Description
    Language
    Copyright
    itunes:author
    itunes:explicit (yes, no, clean)
    itunes:image
    itunes:category
  */
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  copyright: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itunes_author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itunes_explicit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itunes_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itunes_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Feed;