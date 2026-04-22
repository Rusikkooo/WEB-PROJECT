from rest_framework import serializers
from .models import Flight, Booking

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    flight_data = FlightSerializer(source='flight', read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'flight', 'flight_data', 'passengers', 'booking_date', 'status']
        read_only_fields = ['id', 'user', 'booking_date']

