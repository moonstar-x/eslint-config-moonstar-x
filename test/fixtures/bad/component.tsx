import React from 'react';

export const List = ({ items }: { items: string[] }) => <ul>{items.map((item) => <li>{item}</li>)}</ul>;

export const Bad = () => <div onClick={() => undefined}>click</div>;
