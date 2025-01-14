import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { categories } from './CategorySelector';

const BillCard = ({ 
  item, 
  currentUser, 
  onPress, 
  onPaymentPress 
}) => {
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#6B7280';
  };

  const getCategoryIcon = (category) => {
    const categoryItem = categories.find(cat => cat.id === category);
    return categoryItem ? categoryItem.icon : 'grid';
  };

  const renderStatus = () => {
    if (item.isCreator) {
      if (item.totalPending > 0) {
        return `$${item.totalPending.toFixed(2)} Pending`;
      }
      return 'Received';
    }
    if (item.status === 'paid') {
      return 'You paid';
    }
    return 'You owe';
  };

  const getStatusColor = () => {
    if (item.isCreator) {
      return item.totalPending > 0 ? '#FF9500' : '#34C759';
    }
    return item.status === 'paid' ? '#34C759' : '#FF3B30';  // Changed to red for money owed
  };

  const renderAmountText = () => {
    if (item.isCreator) {
      return (
        <Text style={styles.createdBy}>
          Requested by {item.creatorName}
        </Text>
      );
    }
    return (
      <Text style={styles.createdBy}>
        {item.status === 'paid' ? 'Paid to' : 'You owe'} {item.creatorName}
      </Text>
    );
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.paymentCard,
        { backgroundColor: `${getCategoryColor(item.category)}15` },
        { borderColor: getCategoryColor(item.category) }
      ]}>
        <View style={[
          styles.categoryIcon,
          { backgroundColor: `${getCategoryColor(item.category)}30` }
        ]}>
          <Feather
            name={getCategoryIcon(item.category)}
            size={24}
            color={getCategoryColor(item.category)}
          />
        </View>
        
        <View style={styles.paymentContent}>
          <View style={styles.paymentHeader}>
            <Text style={styles.billTitle}>{item.billTitle}</Text>
            <Text style={[
              styles.amount,
              !item.isCreator && item.status === 'pending' && styles.amountOwed
            ]}>
              ${item.amount.toFixed(2)}
            </Text>
          </View>
          
          {item.billDescription ? (
            <Text style={styles.description} numberOfLines={2}>
              {item.billDescription}
            </Text>
          ) : null}
          
          <View style={styles.paymentFooter}>
            {renderAmountText()}
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {renderStatus()}
            </Text>
          </View>
          
          <Text style={styles.date}>
            {item.createdAt.toLocaleDateString()}
          </Text>
  
          {!item.isCreator && item.status === 'pending' && (
            <TouchableOpacity
              style={[styles.payButton, { backgroundColor: getCategoryColor(item.category) }]}
              onPress={(e) => {
                e.stopPropagation();
                onPaymentPress(item.id);
              }}
            >
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    paymentCard: {
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
      borderWidth: 1,
      flexDirection: 'row',
    },
    categoryIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    paymentContent: {
      flex: 1,
    },
    paymentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    billTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      marginRight: 8,
    },
    amount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    amountOwed: {
      color: '#FF3B30',  // Red color for amounts you owe
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    paymentFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    createdBy: {
      fontSize: 14,
      color: '#666',
    },
    status: {
      fontWeight: '600',
    },
    date: {
      fontSize: 12,
      color: '#999',
    },
    payButton: {
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center',
    },
    payButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });

export default BillCard;