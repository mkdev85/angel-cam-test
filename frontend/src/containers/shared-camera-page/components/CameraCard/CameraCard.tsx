import React from 'react';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import Image from 'next/image';

import type { CameraCardProps } from './CameraCard.props';
import { CameraCardWrapper } from './CameraCard.styles';

export const CameraCard: React.FC<CameraCardProps> = props => {
  const { title, status, thumbnail, ownerFirstName, ownerLastName, ownerEmail } = props;

  return (
    <CameraCardWrapper>
      <Card>
        <CardHeader title={title} subheader={`Status: ${status}`} />

        <Image
          alt={title}
          src={thumbnail}
          layout="responsive"
          width={16}
          height={9}
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/images/image-placeholder.png"
        />

        <CardContent>
          <Typography variant="h6">Owner Details</Typography>

          <Typography variant="body1">
            <b>Email:</b> {ownerEmail}
          </Typography>

          <Typography variant="body1">
            <b>First Name:</b> {ownerFirstName}
          </Typography>

          <Typography variant="body1">
            <b>Last Name:</b> {ownerLastName}
          </Typography>
        </CardContent>
      </Card>
    </CameraCardWrapper>
  );
};

CameraCard.displayName = 'CameraCard';
