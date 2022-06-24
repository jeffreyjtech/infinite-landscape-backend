'use strict';

const { profileCollection } = require('.');

describe('Testing profile model', () => {
  /*
    profileSchema = {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      history: { type: DataTypes.ARRAY(DataTypes.STRING) },
      favorites: { type: DataTypes.ARRAY(DataTypes.STRING) },
      contributions: { type: DataTypes.ARRAY(DataTypes.STRING) },
    };
  */

  const testProfileData = {
    username: 'testProfile',
    history: [1],
    favorites: [1],
    contributions: [1],
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
    const profileRecords = await profileCollection.readAll();
    expect(profileRecords).toBeInstanceOf(Array);
    expect(profileRecords.length).toBeGreaterThanOrEqual(1);
  });

  it('Updates a record', async () => {
    await profileCollection.update(newProfileData, id);

    const updatedProfile = await profileCollection.read(id);

    expect(updatedProfile.username).toBe(newProfileData.username);
  });

  it('Deletes a record', async () => {
    const removedProfile = await profileCollection.delete(id);

    expect(removedProfile).toBeTruthy();
  });

  it('Throws error if record to delete does not exist', async () => {
    expect.assertions(1);
    try {
      await profileCollection.delete(id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
