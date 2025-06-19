const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Export multer middleware
exports.upload = upload;

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const newPost = new Post({
      title,
      content,
      category,
      author: req.user.id,
      image: req.file ? req.file.filename : null
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate('comments.user', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error('Get posts error:', err);
    res.status(500).json({ msg: 'Server error fetching posts' });
  }
};

// Toggle like on a post
exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      msg: alreadyLiked ? 'Post unliked' : 'Post liked',
      likes: post.likes.length
    });
  } catch (err) {
    console.error('Toggle like error:', err);
    res.status(500).json({ msg: 'Server error while toggling like' });
  }
};

// Add comment to a post
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const comment = {
      text: req.body.text,
      user: req.user.id
    };

    post.comments.push(comment);
    await post.save();

    res.json({ msg: 'Comment added', comment });
  } catch (err) {
    console.error('Add comment error:', err.message);
    res.status(500).json({ error: 'Server error while adding comment' });
  }
};

// Edit a post
exports.editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Unauthorized to edit this post' });

    const { title, content, category } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    if (req.file) {
      post.image = req.file.filename;
    }

    const updatedPost = await post.save();
    res.json({ msg: 'Post updated', post: updatedPost });
  } catch (err) {
    console.error('Edit post error:', err);
    res.status(500).json({ msg: 'Server error while editing post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== userId)
      return res.status(403).json({ msg: 'Unauthorized' });

    await Post.findByIdAndDelete(postId);
    res.json({ msg: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ msg: 'Server error while deleting post' });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments.user', 'username');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get posts by a specific user
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find()
      .populate('author', 'username')
      .populate('comments.user', 'username')
      .sort({ createdAt: -1 });

    const userPosts = posts.filter(post => post.author?._id?.toString() === userId);
    
    res.json(userPosts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Get posts by category
exports.getPostsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const posts = await Post.find({ category });
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts by category:', err);
    res.status(500).json({ error: 'Failed to fetch posts by category' });
  }
};