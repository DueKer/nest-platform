import React from 'react';
import { Button, Card } from 'antd';

const ExampleComponent: React.FC = () => {
    return (
        <Card title="Example Component" style={{ width: 300 }}>
            <p>This is an example component using React and Ant Design.</p>
            <Button type="primary">Click Me</Button>
        </Card>
    );
};

export default ExampleComponent;