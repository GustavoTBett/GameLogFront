'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import * as S from './Chart.styled';


const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

export type ChartContainerProps = Omit<React.ComponentProps<'div'>, 'className'> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
};

function ChartContainer({ id, children, config, ...props }: ChartContainerProps) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <S.ChartContainerRoot data-slot="chart" data-chart={chartId} {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </S.ChartContainerRoot>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;


export type PayloadItem = {
  dataKey?: string | number;
  name?: string;
  value?: number | string;
  fill?: string;
  color?: string;
  payload?: Record<string, unknown> & { fill?: string };
  [key: string]: unknown;
};

export interface ChartTooltipContentProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  active?: boolean;
  payload?: PayloadItem[];
  label?: React.ReactNode;
  indicator?: 'line' | 'dot' | 'dashed';
  hideLabel?: boolean;
  hideIndicator?: boolean;
  nameKey?: string;
  labelKey?: string;
  labelFormatter?: (label: React.ReactNode, payload: PayloadItem[]) => React.ReactNode;
  formatter?: (
    value: number | string,
    name: string,
    item: PayloadItem,
    index: number,
    payload: Record<string, unknown>
  ) => React.ReactNode;
  color?: string;
}

function ChartTooltipContent({
  active,
  payload,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <S.TooltipLabelWrapper>
          {labelFormatter(value, payload)}
        </S.TooltipLabelWrapper>
      );
    }

    if (!value) {
      return null;
    }

    return <S.TooltipLabelWrapper>{value}</S.TooltipLabelWrapper>;
  }, [label, labelFormatter, payload, hideLabel, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <S.TooltipWrapper>
      {!nestLabel ? tooltipLabel : null}
      <S.TooltipItemsGrid>
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color || '';

          return (
            <S.TooltipItemRow key={item.dataKey || index} $indicator={indicator}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload || {})
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <S.TooltipIndicator
                        $indicator={indicator}
                        $nestLabel={nestLabel}
                        $color={indicatorColor}
                      />
                    )
                  )}
                  <S.TooltipItemContent $nestLabel={nestLabel}>
                    <S.TooltipItemTextGrid>
                      {nestLabel ? tooltipLabel : null}
                      <span>{itemConfig?.label || item.name}</span>
                    </S.TooltipItemTextGrid>
                    {item.value && (
                      <S.TooltipItemValue>
                        {item.value.toLocaleString()}
                      </S.TooltipItemValue>
                    )}
                  </S.TooltipItemContent>
                </>
              )}
            </S.TooltipItemRow>
          );
        })}
      </S.TooltipItemsGrid>
    </S.TooltipWrapper>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

export interface ChartLegendContentProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  payload?: PayloadItem[];
  verticalAlign?: 'top' | 'bottom' | 'middle' | 'left' | 'right';
  hideIcon?: boolean;
  nameKey?: string;
}

function ChartLegendContent({
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <S.LegendWrapper $verticalAlign={verticalAlign as 'top' | 'bottom' | 'middle'}>
      {payload.map((item, index) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const color = item.color || '';

        return (
          <S.LegendItem key={item.value || index}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <S.LegendIconBox $color={color} />
            )}
            {itemConfig?.label}
          </S.LegendItem>
        );
      })}
    </S.LegendWrapper>
  );
}


function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadRecord = payload as Record<string, unknown>;

  const payloadPayload =
    'payload' in payloadRecord &&
    typeof payloadRecord.payload === 'object' &&
    payloadRecord.payload !== null
      ? (payloadRecord.payload as Record<string, unknown>)
      : undefined;

  let configLabelKey: string = key;

  if (key in payloadRecord && typeof payloadRecord[key] === 'string') {
    configLabelKey = payloadRecord[key] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === 'string'
  ) {
    configLabelKey = payloadPayload[key] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};