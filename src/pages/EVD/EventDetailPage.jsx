import EventDetail from "../../components/EVD/EventDetail";
import mockData from "../../mocks/EVD/EventDetailMock.json";

const EventDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-8">
      <EventDetail
        id={mockData.article_id}
        title={mockData.title}
        source={mockData.vendors.vendor_name}
        date={mockData.created_at}
        content={mockData.content}
        linkUrl={mockData.original_url}
      />
    </div>
  );
};

export default EventDetailPage;