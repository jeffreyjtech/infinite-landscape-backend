'use strict';

const { profileCollection } = require('.');

describe('Testing profile model', () => {
  /*
    title: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    penName: { type: DataTypes.STRING, allowNull: false },
    storyId: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.ENUM(genres), allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    tooltips: { type: DataTypes.JSON },
  */

  const testProfileData = {
    username: 'testProfile',
    history: ['Potato'],
    favorites: ['Tomato'],
    contributions: ['Vegetables'],
  };

  const newProfileData = {
    username: 'newName',
  };

  let id = null;

  it('Creates a record', async () => {
    const newProfile = await profileCollection.create(testProfileData);
    id = newProfile.id;

    expect(newProfile).toBeTruthy();
  });

  it('Throws an error if data fails validation', async () => {
    expect.assertions(1);
    try {
      await profileCollection.create({ history: ['missingNo'] });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Throws an error if username is not unique', async () => {
    expect.assertions(1);
    try {
      await profileCollection.create(testProfileData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Reads all records', async () => {
    const profileRecords = await profileCollection.read();
    expect(profileRecords).toBeInstanceOf(Array);
    expect(profileRecords.length).toBe(1);
  });

  it('Updates a record', async () => {
    await profileCollection.update(id, newProfileData);

    const updatedProfile = await profileCollection.read(id);

    expect(updatedProfile.username).toBe(newProfileData.username);
  });

  it('Deletes a record', async () => {
    const removedProfile = await profileCollection.delete(id);

    expect(removedProfile).toBeTruthy();
  });

  it('Returns null if record to delete does not exist', async () => {
    const removedProfile = await profileCollection.delete(id);

    expect(removedProfile).toBe(null);
  });
});
