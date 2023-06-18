import User from "../models/User";

/* read */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // getting the id of the user from the request parameters.
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId)) // this is an array of promises that will be resolved when all the promises in the array are resolved. basically, we are waiting for all the promises( we make multiple api calls here) to be resolved before we send the response.
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      } // we format the response to only include the fields we need to send to the frontend
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* update */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // if the user already has the friend in their friends array, we remove the friend
    if (user.friends.includes(friendId)) {
      user.friends.pull(friendId); // pull is a mongoose method that removes the friendId from the friends array.
      friend.friends.pull(id); // we also remove the user from the friend's friends array
    } else {
      // else we add the friend
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // similar to commit in regular databases
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId)) // this is an array of promises that will be resolved when all the promises in the array are resolved. basically, we are waiting for all the promises( we make multiple api calls here) to be resolved before we send the response.
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      } // we format the response to only include the fields we need to send to the frontend
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
