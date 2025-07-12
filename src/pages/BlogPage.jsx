import { Link } from 'react-router-dom';
import { Container, Typography, Paper, Box, List, ListItem, ListItemIcon, ListItemText , Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const BlogPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4, fontFamily: 'Roboto, sans-serif' }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          FocusTube ব্যবহার করে মনোযোগ সহকারে শেখার নির্দেশিকা
        </Typography>

        <Typography variant="body1">
          FocusTube-এ স্বাগতম! এই অ্যাপটি আপনাকে ইউটিউবের অন্যান্য ভিডিও, মন্তব্য বা সুপারিশের মতো মনোযোগ নষ্টকারী জিনিসগুলো এড়িয়ে শিক্ষামূলক প্লেলিস্ট দেখতে সাহায্য করবে। চলুন শুরু করা যাক!
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>ধাপ ১: একটি ইউটিউব প্লেলিস্ট খুঁজুন</Typography>
          <Typography variant="body1">
            প্রথমে, ইউটিউবে যান এবং আপনার পছন্দের কোর্স বা টিউটোরিয়াল প্লেলিস্টটি খুঁজুন। প্লেলিস্টটি পেলে আপনার ব্রাউজারের অ্যাড্রেস বার থেকে সেটির URL কপি করুন অথবা শুধু প্লেলিস্ট আইডি-টি কপি করুন।
          </Typography>
          <Box sx={{ my: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, border: '1px solid', borderColor: 'grey.300' }}>
            <Typography variant="caption" display="block">উদাহরণ URL:</Typography>
            <Typography component="code">https://www.youtube.com/playlist?list=PLUvx2CKOD1pllH1JY-F2GgavwYPiQWKyC</Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>উদাহরণ ID:</Typography>
            <Typography component="code">PLUvx2CKOD1pllH1JY-F2GgavwYPiQWKyC</Typography>
          </Box>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>ধাপ ২: আপনার প্লেলিস্ট লোড করুন</Typography>
          <Typography variant="body1">
            FocusTube-এর হোমপেজে যান। 
            
            "YouTube Playlist Link or ID" লেখার একটি ইনপুট বক্স দেখবেন। কপি করা URL বা ID-টি এখানে পেস্ট করুন এবং "Load Playlist" বোতামে ক্লিক করুন।
            <Button variant="text" component={Link} to="/">
                Go to Homepage
            </Button>
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>ধাপ ৩: মনোযোগ-সহায়ক প্লেয়ার</Typography>
          <Typography variant="body1">
            প্লেলিস্ট লোড করার পর আপনাকে প্লেয়ার পেজে নিয়ে যাওয়া হবে। এখানে আপনি পাবেন:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
              <ListItemText primary="বামে প্রধান ভিডিও প্লেয়ার।" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
              <ListItemText primary="ডানে প্লেলিস্টের সমস্ত ভিডিওর একটি পরিচ্ছন্ন তালিকা।" />
            </ListItem>
          </List>
          <Typography variant="body1">
            আপনি তালিকার যেকোনো ভিডিওতে ক্লিক করে সেটি চালাতে পারবেন। বর্তমান ভিডিওটি শেষ হলে প্লেয়ার স্বয়ংক্রিয়ভাবে পরবর্তী ভিডিওটি চালাবে, যা আপনাকে আপনার শেখার উপর মনোযোগ ধরে রাখতে সাহায্য করবে।
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>ধাপ ৪: প্লেলিস্ট সেভ ও পরিচালনা করুন</Typography>
          <Typography variant="body1">
            আপনার লোড করা প্রতিটি প্লেলিস্ট স্বয়ংক্রিয়ভাবে সেভ হয়ে যায়। আপনার সেভ করা প্লেলিস্টগুলো দেখতে, হেডার থেকে "Saved" বোতামে ক্লিক করুন। এখানে আপনি আপনার দেখা সমস্ত প্লেলিস্টের একটি তালিকা পাবেন এবং সেখান থেকে সহজেই পুরোনো কোর্স পুনরায় চালু করতে বা অপ্রয়োজনীয় প্লেলিস্ট মুছে ফেলতে পারবেন।
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>ধাপ ৫: প্লেলিস্ট ফেভারিট করুন</Typography>
          <Typography variant="body1">
            প্লেয়ার পেজে আপনি একটি হার্ট (heart)<span role="img" aria-label="heart">❤️</span> আইকন দেখতে পাবেন। এটিতে ক্লিক করে আপনি একটি প্লেলিস্টকে ফেভারিট হিসেবে চিহ্নিত করতে পারেন। আপনার সমস্ত ফেভারিট প্লেলিস্ট খুঁজে পেতে হেডারের "Favorites" লিঙ্কে ক্লিক করুন। এটি আপনার সবচেয়ে গুরুত্বপূর্ণ কোর্সগুলোকে হাতের কাছে রাখার জন্য খুবই সুবিধাজনক।
          </Typography>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>ধাপ ৬: ডিসপ্লে কাঁপাকাঁপি সমস্যা</Typography>
          <Typography variant="body1">
            আপনার প্লেলিস্টটি প্রথমবার লোড করার পর অনেক সময় দেখবেন যে ভিডিও চালু না হয়ে কাঁপাকাঁপি করতেছে এ জন্য আমি আন্তরিকভাবে দুঃখিত। এই সমস্যা থেকে পরিত্রাণের জন্য প্লেলিস্ট লোড করার পর পেজটি আরো একবার রিফ্রেস করুন। আশা করি এই সমস্যাটি খুব দ্রুত সমাধান করব ইনশাআল্লাহ।
          </Typography>
        </Box>

        <Typography variant="h5" component="h2" sx={{ mt: 4, textAlign: 'center' }}>
            আপনার শেখা আনন্দময় হোক<span role="img" aria-label="smile">😊</span><br />

            <small>Developed by Kamrul Hasan</small>
        </Typography>

      </Paper>
    </Container>
  );
};

export default BlogPage;
