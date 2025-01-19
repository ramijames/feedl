import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

const Feed = sequelize.define('Feed', {
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
    allowNull: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  lastBuildDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  itunes: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

Feed.delete = async (id) => {
  return await Feed.destroy({
    where: { id }
  });
};

Feed.parse = async (url) => {
  try {
    const feed = await parser.parseURL(url);
    console.log('Feed parsed:', feed);
    return feed;
  } catch (error) {
    throw new Error(`Failed to parse feed: ${error.message}`);
  }
};

export default Feed;