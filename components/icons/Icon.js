import React from 'react';
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Colors } from '../../constants';

export const Icon = ({
  name,
  size = 20,
  color = Colors.primary,
  style,
}) => {
  switch (name) {
    // --- Sports ---
    case 'basketball':
      return <MaterialCommunityIcons name="basketball" size={size} color={color} style={style} />;
    case 'football':
    case 'soccer':
      return <MaterialCommunityIcons name="soccer" size={size} color={color} style={style} />;
    case 'tennis':
      return <MaterialCommunityIcons name="tennis-ball" size={size} color={color} style={style} />;
    case 'american_football':
      return <MaterialCommunityIcons name="football" size={size} color={color} style={style} />;
    case 'baseball':
      return <MaterialCommunityIcons name="baseball" size={size} color={color} style={style} />;
    case 'mma':
    case 'boxing':
      return <MaterialCommunityIcons name="boxing-glove" size={size} color={color} style={style} />;

    // --- Navigation Dock ---
    case 'target':
    case 'predictions':
      return <MaterialCommunityIcons name="target" size={size} color={color} style={style} />;
    case 'brain':
    case 'analyst':
    case 'ai':
      return <MaterialCommunityIcons name="brain" size={size} color={color} style={style} />;
    case 'stats':
    case 'chart':
      return <Ionicons name="stats-chart" size={size} color={color} style={style} />;
    case 'settings':
    case 'gear':
      return <Ionicons name="settings-sharp" size={size} color={color} style={style} />;
    case 'slip':
    case 'receipt':
    case 'ticket':
      return <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={color} style={style} />;

    // --- UI Actions & Status ---
    case 'bolt':
    case 'flash':
      return <Ionicons name="flash" size={size} color={color} style={style} />;
    case 'flame':
    case 'fire':
      return <Ionicons name="flame" size={size} color={color} style={style} />;
    case 'sparkles':
      return <Ionicons name="sparkles" size={size} color={color} style={style} />;
    case 'search':
      return <Ionicons name="search" size={size} color={color} style={style} />;
    case 'check':
      return <Ionicons name="checkmark" size={size} color={color} style={style} />;
    case 'close':
      return <Ionicons name="close" size={size} color={color} style={style} />;
    case 'cash':
    case 'bankroll':
      return <Ionicons name="cash-outline" size={size} color={color} style={style} />;
    case 'shield':
      return <Ionicons name="shield-checkmark" size={size} color={color} style={style} />;
    case 'refresh':
      return <Ionicons name="refresh" size={size} color={color} style={style} />;

    default:
      return <Ionicons name="ellipse" size={size} color={color} style={style} />;
  }
};

export default Icon;
