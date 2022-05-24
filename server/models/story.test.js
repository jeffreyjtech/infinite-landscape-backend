const { storyCollection } = require('.');

describe('Testing story model', () => {
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

  const testStoryData = {
    title: 'The best test story ever',
    username: 'test-user',
    penName: 'testy-mctesterson',
    storyId: 'uuid-i-gu3ss',
    description: 'Hello word',
    category: 'horror',
    color: 'ffffff',
    tooltips: JSON.stringify([{ desk: 'its brown' }]),
  };

  const newStoryData = {
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
    const storyRecords = await storyCollection.read();
    expect(storyRecords).toBeInstanceOf(Array);
    expect(storyRecords.length).toBe(1);
  });

  it('Updates a record', async () => {
    await storyCollection.update(id, newStoryData);

    const updatedStory = await storyCollection.read(id);

    expect(updatedStory.username).toBe(newStoryData.username);
  });

  it('Deletes a record', async () => {
    const removedStory = await storyCollection.delete(id);

    expect(removedStory).toBeTruthy();
  });

  it('Returns null if record to delete does not exist', async () => {
    const removedStory = await storyCollection.delete(id);

    expect(removedStory).toBe(null);
  });
});
