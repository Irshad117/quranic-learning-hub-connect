import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Mail, MessageSquare, Users, Package, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data: any;
  read: boolean;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface PackageInquiry {
  id: string;
  name: string;
  email: string;
  region: string;
  duration: number;
  classes_per_week: number;
  price: number;
  currency: string;
  message: string;
  created_at: string;
}

interface HomeSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  form_type: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [packageInquiries, setPackageInquiries] = useState<PackageInquiry[]>([]);
  const [homeSubmissions, setHomeSubmissions] = useState<HomeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', user?.email)
        .single();

      if (!error && data) {
        setIsAdmin(true);
        fetchDashboardData();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [notificationsRes, contactRes, packageRes, homeRes] = await Promise.all([
        supabase.from('notifications').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('package_inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('home_submissions').select('*').order('created_at', { ascending: false })
      ]);

      setNotifications(notificationsRes.data || []);
      setContactSubmissions(contactRes.data || []);
      setPackageInquiries(packageRes.data || []);
      setHomeSubmissions(homeRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your Quran learning platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadNotifications}</div>
              <p className="text-xs text-muted-foreground">Unread notifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactSubmissions.length}</div>
              <p className="text-xs text-muted-foreground">Total messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Package Inquiries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{packageInquiries.length}</div>
              <p className="text-xs text-muted-foreground">Course inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Home Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{homeSubmissions.length}</div>
              <p className="text-xs text-muted-foreground">Form submissions</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <p className="text-muted-foreground">No notifications yet</p>
            ) : (
              <div className="space-y-4">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      notification.read ? 'bg-muted/50' : 'bg-background border-primary'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Submissions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contactSubmissions.length === 0 ? (
              <p className="text-muted-foreground">No contact messages yet</p>
            ) : (
              <div className="space-y-4">
                {contactSubmissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{submission.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(submission.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{submission.email}</p>
                    <p className="text-sm font-medium mb-2">{submission.subject}</p>
                    <p className="text-sm">{submission.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Package Inquiries */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Package Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {packageInquiries.length === 0 ? (
              <p className="text-muted-foreground">No package inquiries yet</p>
            ) : (
              <div className="space-y-4">
                {packageInquiries.slice(0, 5).map((inquiry) => (
                  <div key={inquiry.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{inquiry.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(inquiry.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{inquiry.email}</p>
                    <div className="text-sm space-y-1">
                      <p><strong>Region:</strong> {inquiry.region}</p>
                      <p><strong>Duration:</strong> {inquiry.duration} minutes</p>
                      <p><strong>Classes per week:</strong> {inquiry.classes_per_week}</p>
                      <p><strong>Price:</strong> {inquiry.currency}{inquiry.price}</p>
                      {inquiry.message && <p><strong>Message:</strong> {inquiry.message}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Home Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Home Page Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {homeSubmissions.length === 0 ? (
              <p className="text-muted-foreground">No home submissions yet</p>
            ) : (
              <div className="space-y-4">
                {homeSubmissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{submission.name}</h4>
                      <Badge variant="outline">{submission.form_type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{submission.email}</p>
                    <p className="text-sm font-medium mb-2">{submission.subject}</p>
                    <p className="text-sm">{submission.message}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(submission.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;