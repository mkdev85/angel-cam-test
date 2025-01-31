import React from 'react';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import Image from 'next/image';

import { useRoutes } from '@angel/hooks/useRoutes';

import type { CameraCardProps } from './CameraCard.props';
import { CameraCardWrapper } from './CameraCard.styles';

export const CameraCard: React.FC<CameraCardProps> = props => {
  const { title, cameraId, status, thumbnail, ownerFirstName, ownerLastName, ownerEmail } = props;
  const { gotoRecordingPage } = useRoutes();

  return (
    <CameraCardWrapper>
      <Card className="camera-card" onClick={() => gotoRecordingPage(cameraId)}>
        <CardHeader title={title} subheader={`Status: ${status}`} />

        <div className="image-wrapper">
          <Image
            alt={title}
            src={thumbnail}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/images/image-placeholder.png"
          />
        </div>

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
