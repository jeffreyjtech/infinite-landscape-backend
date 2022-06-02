const { storyCollection } = require('.');

describe('Testing story model', () => {
  /* Story schema
    label: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    penName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    group: { type: DataTypes.ENUM(genres), allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    tooltips: { type: DataTypes.JSON },
    neighbors: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    }
  */

  const testStoryData = {
    label: 'The best test story ever',
    username: 'test-user',
    penName: 'testy-mctesterson',
    description: 'Hello word',
    group: 'horror',
    color: 'ffffff',
    tooltips: JSON.stringify([{ desk: 'its brown' }]),
    neighbors: [],
  };

  const putStoryData = {
    username: 'newName',
  };

  let id = null;

  it('Creates a record', async () => {
    const newStory = await storyCollection.create(testStoryData);
    id = newStory.id;

    expect(newStory).toBeTruthy();
  });

  it('Throws an error if data fails validation', async () => {
    expect.assertions(1);
    try {
      await storyCollection.create({ color: ['missingNo'] });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Returns parse-able JSON in the tooltips property', async () => {
    const story = await storyCollection.read(id);

    const tooltips = await JSON.parse(story.tooltips);

    expect(tooltips).toBeInstanceOf(Array);
    expect(tooltips.length).toBe(1);
    expect(tooltips[0]).toStrictEqual({ desk: 'its brown' });
  });

  it('Reads all records', async () => {
    const storyRecords = await storyCollection.readAll();
    expect(storyRecords).toBeInstanceOf(Array);
    expect(storyRecords.length).toBeGreaterThanOrEqual(1);
  });

  it('Updates a record', async () => {
    await storyCollection.update(putStoryData, id);

    const updatedStory = await storyCollection.read(id);

    expect(updatedStory.username).toBe(putStoryData.username);
  });

  it('Deletes a record', async () => {
    const removedStory = await storyCollection.delete(id);

    expect(removedStory).toBeTruthy();
  });

  it('Throws error if record to delete does not exist', async () => {
    expect.assertions(1);
    try {
      await storyCollection.delete(id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
